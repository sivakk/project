import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { Issue } from "./issue";
import { IssuesService } from "./issues.service";

@Component({
  selector: "app-issue",
  templateUrl: "./issue.component.html",
  styleUrls: ["./issue.component.css"],
  providers: [IssuesService]
})
export class IssueComponent implements OnInit {
  issues: Issue[] = [];
  selectedissue: Issue;
  isLoading = false;
  private postsSub: Subscription;

  constructor(public postsService: IssuesService) {}

  ngOnInit() {
    this.getissues();
  }

  getissues() {
    this.postsService.getPersons().subscribe(items => {
      console.log(items);

      this.issues = items;
      console.log(items);
      console.log("issue name " + this.issues[0].issuename);
      console.log("issue content " + this.issues[0].issuecontent);
    });
  }
  addIssues(form) {
    let newIssue: Issue = {
      issuename: form.value.issuename,
      issuecontent: form.value.issuecontent
    };
    this.postsService.addIssue(newIssue).subscribe(item => {
      console.log(item);
      this.getissues();
    });
  }
}
