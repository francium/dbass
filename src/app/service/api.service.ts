import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";

@Injectable({
    providedIn: "root",
})
export class ApiService {
    constructor(private readonly http: HttpClient) {}

    executeSqlQuery(query: string): Observable<{status: "ok" | "error"; result: any[]}> {
        return this.http.post("/api/execute", query).pipe(
            map((response: any) => {
                return {
                    status: response.status,
                    result: response?.result ?? [],
                };
            }),
        );
    }
}
