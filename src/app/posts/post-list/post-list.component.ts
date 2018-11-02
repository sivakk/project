import { Component, OnInit, OnDestroy } from "@angular/core";
import { Issue } from "./issue";
import { IssuesService } from "./issues.service";
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material";
import { NgModule } from "@angular/core";
import { ToastrService } from "ngx-toastr";

import {
  FormGroup,
  FormsModule,
  FormControl,
  Validators
} from "@angular/forms";

import { Post } from "../post.model";
import { PostsService } from "../posts.service";
import { post } from "selenium-webdriver/http";

export interface Food {
  value: string;
  viewValue: string;
}

export interface Car {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"],
  providers: [IssuesService]
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   { title: "First Post", content: "This is the first post's content" },
  //   { title: "Second Post", content: "This is the second post's content" },
  //   { title: "Third Post", content: "This is the third post's content" }
  // ];
  selectedValue: string;
  selectedCar: string;
  issues: Issue[] = [];
  selectedissue: Issue;
  isLoading = false;
  posts: Post[] = [];
  private postsSub: Subscription;
  today: number = Date.now();
  form: FormGroup;
  imagePreview: any;
  options = [1, 2, 3];
  optionSelected: any;
  foods: Food[] = [
    { value: "steak-0", viewValue: "Steak" },
    { value: "pizza-1", viewValue: "Pizza" },
    { value: "tacos-2", viewValue: "Tacos" }
  ];

  cars: Car[] = [
    { value: "volvo", viewValue: "Volvo" },
    { value: "saab", viewValue: "Saab" },
    { value: "mercedes", viewValue: "Mercedes" }
  ];
  messages: any;

  constructor(
    private toastService: ToastrService,
    public postsService: PostsService,
    public IssuesService: IssuesService
  ) {}

  ngOnInit() {
    this.getissues();
    this.form = new FormGroup({
      image: new FormControl(null, {
        validators: [Validators.required]
      })
    });

    this.isLoading = true;
    this.postsService.getPosts();
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
      });
  }
  showSuccess() {
    this.toastService.success("Issue recived", "Thank you");
  }
  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }
  onOptionSelected(event) {
    console.log(event); //option value will be sent as event
  }

  onImagePicked1(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(file);
  }
  getissues() {
    this.IssuesService.getPersons().subscribe(items => {
      console.log(items);

      this.issues = items;
      console.log(items);
      console.log("issue name " + this.issues[0].issuename);
      console.log("issue content " + this.issues[0].issuecontent);
    });
  }
  addIssues(form) {
    let newIssue: Issue = {
      issuename: this.selectedValue,
      issuecontent: form.value.issuecontent
    };
    this.IssuesService.addIssue(newIssue).subscribe(item => {
      console.log(item);
      this.getissues();
    });
  }

  onEdit(
    postId: string,
    posttitle: string,
    postcontent: string,
    postimg: File | string
  ) {
    this.postsService.Editimage(
      postId,
      this.form.value.title,
      this.form.value.content,
      this.form.value.image
    );

    var interval = setInterval(() => {
      this.postsService.getPosts();
      clearInterval(interval);
    }, 5000);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
