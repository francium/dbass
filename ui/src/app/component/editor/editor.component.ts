import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    NgZone,
    OnDestroy,
    Output,
    ViewChild,
} from "@angular/core";
import * as ace from "ace-builds";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/theme-merbivore";
import {BehaviorSubject, combineLatest, EMPTY, fromEvent, merge, Observable} from "rxjs";
import {debounceTime, map, startWith} from "rxjs/operators";

import {CursorPosition, defaultCursorPosition, Status} from "@app/model";

@Component({
    selector: "app-editor",
    templateUrl: "./editor.component.html",
    styleUrls: ["./editor.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent implements AfterViewInit, OnDestroy {
    @Input()
    set status(status: Status) {
        this.status$.next(status);
    }
    private readonly status$ = new BehaviorSubject<Status>("ready");

    @Output("textChange")
    textChange$ = new EventEmitter<string>();

    @ViewChild("editorHostEl")
    private readonly editorHostELRef!: ElementRef;

    statusBarData$: Observable<StatusBarData> = EMPTY;

    private aceEditorRef!: ace.Ace.Editor;

    constructor(
        private readonly ngZone: NgZone,
        private readonly cdr: ChangeDetectorRef,
    ) {}

    ngAfterViewInit(): void {
        this.initAceEditor();
        this.initStatusbarData();
    }

    ngOnDestroy(): void {
        this.aceEditorRef.destroy();
    }

    private initAceEditor(): void {
        const editorHostEl = this.editorHostELRef.nativeElement;
        this.ngZone.runOutsideAngular(() => {
            this.aceEditorRef = ace.edit(editorHostEl, {
                mode: "ace/mode/sql",
                theme: "ace/theme/merbivore",
                enableBasicAutocompletion: true,
            } as any); // enableBasicAutocompletion isn't in typings
            this.aceEditorRef.setFontSize("1rem");
            this.aceEditorRef.setValue(sampleSqlText, -1);
            this.aceEditorRef.completers = [staticWordCompleter];
            this.aceEditorRef.on("change", () => {
                this.textChange$.next(this.aceEditorRef.getValue());
            });

            this.textChange$.next(this.aceEditorRef.getValue());
        });
    }

    private initStatusbarData(): void {
        const editorCursorPosition$ = merge(
            fromEvent<KeyboardEvent>(
                this.editorHostELRef.nativeElement.querySelector("textarea"),
                "keydown",
            ),
            fromEvent<KeyboardEvent>(this.editorHostELRef.nativeElement, "click"),
        ).pipe(
            // Prevent two temporally close events from triggering this twice
            debounceTime(1),

            map(() => this.aceEditorRef.getCursorPosition()),
            startWith(defaultCursorPosition),
        );

        this.statusBarData$ = combineLatest([editorCursorPosition$, this.status$]).pipe(
            map(
                ([cursorPosition, status]): StatusBarData => ({
                    cursorPosition,
                    status,
                }),
            ),
        );

        // Necessary, otherwise, new observable isn't subscribed in template
        this.cdr.detectChanges();
    }
}

const staticWordCompleter: ace.Ace.Completer = {
    getCompletions: function (
        _: ace.Ace.Editor,
        __: ace.Ace.EditSession,
        ___: ace.Ace.Point,
        ____: string,
        callback: ace.Ace.CompleterCallback,
    ): any {
        var wordList = ["foo", "bar", "baz"];
        callback(
            null,
            wordList.map(word => {
                return {
                    caption: word,
                    value: word,
                    meta: "static",
                    score: 0,
                };
            }),
        );
    },
};

type StatusBarData = {
    cursorPosition: CursorPosition;
    status: Status;
};

const sampleSqlText = `
select *
from country;
`.trim();
