import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

import {ApiQueryExecutionResponse} from "@app/model";

@Injectable({
    providedIn: "root",
})
export class ApiService {
    constructor(private readonly http: HttpClient) {}

    executeSqlQuery(query: string): Observable<ApiQueryExecutionResponse> {
        return this.http
            .post("/api/execute", query)
            .pipe(map(response => response as ApiQueryExecutionResponse));
    }
}
