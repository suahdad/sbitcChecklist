import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  alertUnavailable(){
    window.alert("This Feature is not yet available.");
  }

  GoToChecklists(){
    this.router.navigateByUrl('/admin/(sub:management/checklists)')
  }

}
