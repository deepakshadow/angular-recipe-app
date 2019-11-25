import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-recipe-book",
  templateUrl: "./recipe-book.component.html",
  styleUrls: ["./recipe-book.component.css"]
})
export class RecipeBookComponent implements OnInit {
  constructor(private toastr: ToastrService) {}

  ngOnInit() {
    setTimeout(() => {
      this.toastr.warning(`SAVE the recipes after any change.`);
    }, 4000);
  }
}
