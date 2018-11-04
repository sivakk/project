import { Component, OnInit, OnDestroy } from "@angular/core";
import { Issue } from "./issue";
import { IssuesService } from "./issues.service";
import { Subscription, interval } from "rxjs";
import { ToastrService } from "ngx-toastr";

import {
  FormGroup,
  FormsModule,
  FormControl,
  Validators
} from "@angular/forms";

import { Post } from "../post.model";
import { PostsService } from "../posts.service";

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
  selectedValue: string;
  selectedCar: string;
  issues: Issue[] = [];
  selectedissue: Issue;
  isLoading = false;
  posts: Post[] = [];
  startDate: any;
  interval: any;
  private postsSub: Subscription;
  today: number = Date.now();
  today1: any = new Date().getTime();
  form: FormGroup;
  disableButton: any;
  count: number = 0;
  countDownDate: any;
  disableButton1: any;
  imagePreview: any;
  item: any;
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
  post: any;

  constructor(
    private toastService: ToastrService,
    public postsService: PostsService,
    public IssuesService: IssuesService
  ) {}

  ngOnInit() {
    var totalSeconds = 0;
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
    this.toastService.success("post", "Thank you");
  }

  showInfo() {
    this.toastService.info("Not Added.");
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
      if (items) {
        console.log(items);

        this.issues = items;
        this.item = this.issues.length;

        console.log(items);
        console.log("issue name " + this.issues[0].issuename);
        console.log("issue content " + this.issues[0].issuecontent);
      } else {
        this.showInfo();
      }
    });
    if (this.item) {
      this.showSuccess();
      this.item = 0;
    }
  }

  pick() {
    this.interval = setInterval(count => {
      this.count++;
    }, 1000);

    this.countDownDate = new Date().getTime();
    console.log(this.countDownDate);

    return this.countDownDate, this.interval;
  }

  off() {
    console.log(this.countDownDate);
    clearInterval(this.interval);
    this.count = 0;

    let distance: any = new Date().getTime() - this.countDownDate;
    console.log(distance);

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    console.log(seconds, minutes, hours, days);
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
  }
  truthClick() {
    this.disableButton = true;
  }

  truthClick1() {
    this.disableButton1 = true;
  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
