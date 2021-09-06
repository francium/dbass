import {snowfakeId} from "@lib/snowflake-id";

export type Int = number;

export type Status = "processing" | "ready" | "error";

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

export type DataPanelState = {
    status: Status;
    data: any[];
};
export const defaultDataPanelState: DataPanelState = {
    status: "ready",
    data: [],
};
