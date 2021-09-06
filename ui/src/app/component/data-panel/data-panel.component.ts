import {Component, ChangeDetectionStrategy, Input} from "@angular/core";
import {Subject} from "rxjs";
import {filter} from "rxjs/operators";

import {
    DataPanelErrorState,
    DataPanelIdleState,
    DataPanelLoadingState,
    DataPanelOkState,
    DataPanelState,
    defaultDataPanelState,
} from "@app/model";

@Component({
    selector: "app-data-panel",
    templateUrl: "./data-panel.component.html",
    styleUrls: ["./data-panel.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataPanelComponent {
    @Input()
    data: DataPanelState = defaultDataPanelState;

    get okData(): DataPanelOkState {
        return this.data as DataPanelOkState;
    }
    get errorData(): DataPanelErrorState {
        return this.data as DataPanelErrorState;
    }
    get idleData(): DataPanelIdleState {
        return this.data as DataPanelIdleState;
    }
    get loadingData(): DataPanelLoadingState {
        return this.data as DataPanelLoadingState;
    }
}
