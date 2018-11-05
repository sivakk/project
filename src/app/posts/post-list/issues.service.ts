import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { map, filter, scan } from "rxjs/operators";
import { Router } from "@angular/router";

import { Issue } from "./issue";
import { Time } from "./time";

@Injectable({
  providedIn: "root"
})
export class IssuesService {
  private issue: Issue[] = [];
  private time: Time[] = [];

  constructor(private http: Http, private router: Router) {}

  addTime(timesequence) {
    console.log(timesequence);

    var obj = {
      timesequencename: timesequence
    };

    console.log(timesequence);

    console.log(obj);

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .post("http://localhost:3000/api/timers/post_route", timesequence, {
        headers: headers
      })
      .pipe(map(res => res));
  }

  getPersons() {
    return this.http
      .get("http://localhost:3000/api/issues/test")
      .pipe(map(res => res.json()));
  }
  addIssue(newIssue) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .post("http://localhost:3000/api/issues/post_route", newIssue, {
        headers: headers
      })
      .pipe(map(res => res.json()));
  }
}
