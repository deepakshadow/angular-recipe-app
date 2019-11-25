import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError, tap } from "rxjs/operators";
import { throwError, BehaviorSubject } from "rxjs";
import { User } from "./auth.model";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  user: any = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;
  // user: any = new Subject<User>();

  private signUpUrl: string =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
  private loginUrl: string =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
  private authToken: string = "AIzaSyAT35Qis6l0ZqvdZtHftFJ1d54SDjREUR0";

  constructor(private _http: HttpClient, private router: Router) {}

  signUp = (email: string, password: string) => {
    return this._http
      .post<AuthResponseData>(this.signUpUrl + this.authToken, {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  };

  login = (email: string, password: string) => {
    return this._http
      .post<AuthResponseData>(this.loginUrl + this.authToken, {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  };

  autoLogin = () => {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem("userData"));

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  };

  logout = () => {
    this.user.next(null);
    this.router.navigate(["/auth"]);
    localStorage.removeItem("userData");
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  };

  autoLogout = (expirationDuration: number) => {
    // console.log(expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  };

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem("userData", JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorResponse = `An Unknown Error Occurred!!!`;
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorResponse);
    }
    switch (errorRes.error.error.message) {
      case "EMAIL_EXISTS":
        errorResponse = `This Email Already exists!!!`;
        break;
      case "EMAIL_NOT_FOUND":
        errorResponse = `This Email doesn't exist!!!`;
        break;
      case "INVALID_PASSWORD":
        errorResponse = `this password is incorrect!!!`;
        break;
    }

    return throwError(errorResponse);
  }
}
