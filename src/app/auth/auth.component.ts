import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

import { AuthService, AuthResponseData } from "./auth.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"]
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  ngOnInit() {}

  onSwitchMode = () => {
    this.isLoginMode = !this.isLoginMode;
  };

  onSubmit = (form: NgForm) => {
    let authObservable: Observable<AuthResponseData>;
    // console.log(form.value);
    if (!form.valid) {
      return;
    }
 
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;
    if (this.isLoginMode) {
      authObservable = this.authService.login(email, password);
    } else {
      authObservable = this.authService.signUp(email, password);
    }

    authObservable.subscribe(
      data => {
        // console.log(data);
        this.router.navigate(["/recipes"]);
        this.toastr.success(`You are signed In...`)
        this.isLoading = false;
      },
      errorResponse => {
        // console.log(errorResponse);
        this.error = errorResponse;
        this.isLoading = false;
      }
    );
    form.reset();
  };
}
