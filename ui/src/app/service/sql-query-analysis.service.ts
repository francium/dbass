import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {filter, first} from "rxjs/operators";

import {generateSqlQueryAnalysisJob, SqlQueryAnalysisResult} from "@app/model";

@Injectable({
    providedIn: "root",
})
export class SqlQueryAnalysisService {
    private readonly worker: Worker;

    private readonly workerMessage$ = new Subject<SqlQueryAnalysisResult>();

    constructor() {
        this.worker = new Worker(new URL("../worker/parser.worker", import.meta.url));
        this.worker.onmessage = this.onWorkerMessage.bind(this);
    }

    public analyze(value: string): Promise<SqlQueryAnalysisResult> {
        const job = generateSqlQueryAnalysisJob(value);

        const result = this.workerMessage$
            .pipe(
                filter(result => result.id === job.id),
                first(),
            )
            .toPromise();
        this.worker.postMessage(job);

        return result;
    }

    private onWorkerMessage({data: result}: {data: SqlQueryAnalysisResult}): void {
        this.workerMessage$.next(result);
    }
}
