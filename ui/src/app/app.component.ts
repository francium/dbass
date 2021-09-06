import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
} from "@angular/core";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {combineLatest, Subject} from "rxjs";
import {debounceTime, map, switchMap, tap, withLatestFrom} from "rxjs/operators";

import {AppService} from "./service/app.service";

@UntilDestroy()
@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit {
    renderData$ = combineLatest([
        this.appService.editorStatus$,
        this.appService.dataPanelState$,
    ]).pipe(
        map(([editorStatus, dataPanelData]) => ({
            editorStatus,
            dataPanelData,
        })),
    );

    private queryText$ = new Subject<string>();
    private runClick$ = new Subject<void>();
    private runQuery$ = this.runClick$
        .pipe(
            untilDestroyed(this),
            withLatestFrom(this.queryText$),
            debounceTime(50),
            tap(([_, query]) => this.appService.runQuery(query)),
        )
        .subscribe();

    constructor(
        private readonly appService: AppService,
        private readonly cdr: ChangeDetectorRef,
    ) {}

    ngAfterViewInit(): void {
        this.renderData$.pipe(untilDestroyed(this)).subscribe(() => {
            // NOTE: When using a websocker, messages aren't tracked by
            // zone.js, need to manually call CD
            this.cdr.detectChanges();
        });
    }

    onEditorTextChange(value: string): void {
        this.appService.editorTextChange(value);
        this.queryText$.next(value);
    }

    onRunClick(): void {
        this.runClick$.next();
    }
}
