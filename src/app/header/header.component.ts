import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  authSubscription: Subscription;
  isAuthenticated: boolean = false;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    })
  }

  onSaveData = () => {
    this.dataStorageService.onSendingData();
  }

  onFetchData = () => {
    this.dataStorageService.onFetchingData().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

}
