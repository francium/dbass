import {ChangeDetectionStrategy, Component, Input} from "@angular/core";

import {CursorPosition, defaultCursorPosition, Status} from "@app/model";

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
}
