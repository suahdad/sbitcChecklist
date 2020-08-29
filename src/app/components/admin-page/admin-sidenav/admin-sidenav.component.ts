import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-admin-sidenav',
  templateUrl: './admin-sidenav.component.html',
  styleUrls: ['./admin-sidenav.component.css']
})
export class AdminSidenavComponent implements OnInit {

  public isProfileCollapsed: boolean = true;
  public isManagementCollapsed: boolean = true;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  GoToChangePass(){
    this.router.navigateByUrl('/admin/(sub:profile/changepass)')
  }

  GoToManagementUser(){
    this.router.navigateByUrl('/admin/(sub:management/user)')
  }

}
