import {snowfakeId} from "@lib/snowflake-id";

export type Int = number;

export type Status = "processing" | "ok" | "error";

export type CursorPosition = {
    row: number;
    column: number;
};
export const defaultCursorPosition: CursorPosition = {
    row: 1,
    column: 1,
} as const;

export type SqlQueryAnalysisJob = {
    id: number;
    value: string;
};
export function generateSqlQueryAnalysisJob(value: string): SqlQueryAnalysisJob {
    return {
        id: snowfakeId(),
        value,
    };
}

export type SqlQueryAnalysisResult = {
    id: number;
    valid: boolean;
};

export type DataPanelIdleState = {
    status: "idle";
};
export type DataPanelProcessingState = {
    status: "processing";
};
export type DataPanelOkState = {
    status: "ok";
    columnLabels: string[];
    rows: ApiQueryRow[];
};
export type DataPanelErrorState = {
    status: "error";
};
export type DataPanelState =
    | DataPanelIdleState
    | DataPanelProcessingState
    | DataPanelOkState
    | DataPanelErrorState;
export const defaultDataPanelState: DataPanelState = {
    status: "idle",
};

// API ////////////////////////////////////////////////////////////////////////

export type ApiQueryRow = Array<string | number>;
export type ApiQueryData = {
    columnLabels: string[];
    rows: ApiQueryRow[];
};

export type ApiQuerySuccessfulExecution = {
    status: "ok";
    data: ApiQueryData;
};
export type ApiQueryErrorExecution = {
    status: "error";
};
export type ApiQueryExecutionResponse =
    | ApiQuerySuccessfulExecution
    | ApiQueryErrorExecution;
