import {ChangeDetectionStrategy, Component, Input} from "@angular/core";

import {CursorPosition, defaultCursorPosition, Status} from "@app/model";

import {
    checkmark as checkmarkSvg,
    loading as loadingSvg,
    cross as crossSvg,
} from "./svg-icons";

@Component({
    selector: "app-editor-status-bar",
    templateUrl: "./editor-status-bar.component.html",
    styleUrls: ["./editor-status-bar.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorStatusBarComponent {
    @Input()
    message?: string;

    @Input()
    status?: Status;

    @Input()
    cursorPosition: CursorPosition = defaultCursorPosition;

    get statusIcon(): string {
        return this.status ? statusToSvgIcon(this.status) : "";
    }
}

function statusToSvgIcon(status: Status): string {
    switch (status) {
        case "error":
            return crossSvg;
        case "ready":
            return checkmarkSvg;
        case "processing":
            return loadingSvg;
    }
}
