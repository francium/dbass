import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

import {DataPanelState, defaultDataPanelState, Status} from "@app/model";

import {ApiService} from "./api.service";
import {SqlQueryAnalysisService} from "./sql-query-analysis.service";

@Injectable({
    providedIn: "root",
})
export class AppService {
    private readonly editorStatusSubject$ = new BehaviorSubject<Status>("ready");
    public readonly editorStatus$ = this.editorStatusSubject$.asObservable();

    private readonly dataPanelStateSubject$ = new BehaviorSubject<DataPanelState>(
        defaultDataPanelState,
    );
    public readonly dataPanelState$ = this.dataPanelStateSubject$.asObservable();

    constructor(
        private readonly sqlQueryAnalysisService: SqlQueryAnalysisService,
        private readonly apiService: ApiService,
    ) {}

    public editorTextChange(value: string): void {
        this.editorStatusSubject$.next("processing");
        this.sqlQueryAnalysisService.analyze(value).then(result => {
            const status = result.valid ? "ready" : "error";
            this.editorStatusSubject$.next(status);
        });
    }

    public runQuery(query: string): void {
        this.apiService.executeSqlQuery(query).subscribe(response => {
            this.dataPanelStateSubject$.next({
                status: response.status === "ok" ? "ready" : "error",
                data: response.result,
            });
        });
    }
}
