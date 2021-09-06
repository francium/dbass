import {Component, ChangeDetectionStrategy, Output, EventEmitter} from "@angular/core";

@Component({
    selector: "app-header-bar",
    templateUrl: "./header-bar.component.html",
    styleUrls: ["./header-bar.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderBarComponent {
    @Output("runClick")
    runClick$ = new EventEmitter<void>();

    onRunClick(): void {
        this.runClick$.next();
    }
}
