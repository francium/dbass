import {Component, ChangeDetectionStrategy, Input} from "@angular/core";

import {Status} from "@app/model";

@Component({
    selector: "app-data-panel-status-bar",
    templateUrl: "./data-panel-status-bar.component.html",
    styleUrls: ["./data-panel-status-bar.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataPanelStatusBarComponent {
    @Input()
    status?: Status;

    @Input()
    message?: string;

    @Input()
    numResults?: number;
}
