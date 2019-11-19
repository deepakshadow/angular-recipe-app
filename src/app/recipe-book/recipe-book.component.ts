import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css']
})
export class RecipeBookComponent implements OnInit {

  constructor(private toastr: ToastrService) { }

  ngOnInit() {
    this.toastr.warning(`Hey! FETCH the data which is in right-top corner manage section.`);
    setTimeout(() => {
      this.toastr.warning(`SAVE after any change in recipe section.`);
    }, 4000);
  }
}
