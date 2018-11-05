import { Component, OnInit } from "@angular/core";
import { NgModule } from "@angular/core";
import { formatDate } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { MatNativeDateModule } from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import {
  FormGroup,
  FormsModule,
  FormControl,
  AbstractControl,
  Validators
} from "@angular/forms";
import { ActivatedRoute, ParamMap, Params } from "@angular/router";

import { PostsService } from "../posts.service";
import { Post } from "../post.model";
import { mimeType } from "./mime-type.validator";
import { Food } from "./Food";

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.scss"]
})
export class PostCreateComponent implements OnInit {
  enteredTitle = "";
  now1: Date;
  enteredContent = "";
  post: Post;
  interval: any;
  interval1: any;
  isLoading = false;
  form: FormGroup;
  imagePreview: any;
  private mode = "create";
  private postId: string;
  timeLeft: number = 1;
  timeLeft1: number = 1;
  today1: any;
  value: any;
  count1: number = 0;
  timer: number;
  m: number = 0;
  hours: any;
  count: number;
  end: number;
  customers = ["sai", "siva", "murali"];
  selectedValue: string;
  selectedCar: string;

  foods: Food[] = [
    { value: "steak-0", viewValue: "Steak" },
    { value: "pizza-1", viewValue: "Pizza" },
    { value: "tacos-2", viewValue: "Tacos" }
  ];
  today = new Date().getTime();
  today2 = new Date().getTime();
  today3 = this.today - this.today1;
  jstoday = "";

  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("postId")) {
        this.mode = "edit";
        this.postId = paramMap.get("postId");
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
            imagePath: postData.imagePath
          };
          this.form.setValue({
            title: this.post.title,
            content: this.post.content,
            image: this.post.imagePath
          });
        });
      } else {
        this.mode = "create";
        this.postId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    console.log(this.value);
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(file);
  }

  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.postsService.addPost(
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
    } else {
      this.postsService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
    }
    this.form.reset();
  }
}
