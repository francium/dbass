/// <reference lib="webworker" />
import {SqlQueryAnalysisJob, SqlQueryAnalysisResult} from "@app/model";

import {validateInput} from "@lib/sql-parser";

addEventListener("message", ({data: job}: {data: SqlQueryAnalysisJob}) => {
    const valid = validateInput(job.value);
    const response: SqlQueryAnalysisResult = {
        id: job.id,
        valid,
    };
    postMessage(response);
});
