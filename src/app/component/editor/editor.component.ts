import * as ace from "ace-builds";
import "ace-builds/src-noconflict/theme-merbivore";
import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/ext-language_tools";

import {
    Component,
    ChangeDetectionStrategy,
    ViewChild,
    ElementRef,
    AfterViewInit,
    OnDestroy,
    NgZone,
} from "@angular/core";

@Component({
    selector: "app-editor",
    templateUrl: "./editor.component.html",
    styleUrls: ["./editor.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent implements AfterViewInit, OnDestroy {
    @ViewChild("editorHostEl")
    private readonly editorHostELRef!: ElementRef;

    private aceEditorRef!: ace.Ace.Editor;

    constructor(private readonly ngZone: NgZone) {}

    ngAfterViewInit(): void {
        const editorHostEl = this.editorHostELRef.nativeElement;
        this.ngZone.runOutsideAngular(() => {
            this.aceEditorRef = ace.edit(editorHostEl, {
                mode: "ace/mode/sql",
                theme: "ace/theme/merbivore",
                enableBasicAutocompletion: true,
            } as any); // enableBasicAutocompletion isn't in typings
            this.aceEditorRef.setValue(
                `SELECT
    first_name
FROM
    employees
WHERE
    YEAR(hire_date) = 2000;`,
                -1,
            );
            this.aceEditorRef.completers = [staticWordCompleter];
        });
    }

    ngOnDestroy(): void {
        this.aceEditorRef.destroy();
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
