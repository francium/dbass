import {Component, ChangeDetectionStrategy, Input} from "@angular/core";

import {DataPanelState, defaultDataPanelState} from "@app/model";

@Component({
    selector: "app-data-panel",
    templateUrl: "./data-panel.component.html",
    styleUrls: ["./data-panel.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataPanelComponent {
    @Input()
    data: DataPanelState = defaultDataPanelState;
}
