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
    this.toastr.warning(`Hello, kindly note to fetch the data which is in right-top corner and save after edit`);
  }
}
