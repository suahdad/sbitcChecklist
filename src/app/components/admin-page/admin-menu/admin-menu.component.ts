import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {

  
  @Output() sidenavToggle: EventEmitter<any> = new EventEmitter();

  public isMenuCollapsed: boolean;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  
  SidenavToggle(){
    this.sidenavToggle.emit(null)
  }


}
