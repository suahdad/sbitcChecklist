import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/services/user.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-user-management',
  templateUrl: './admin-user-management.component.html',
  styleUrls: ['./admin-user-management.component.scss']
})
export class AdminUserManagementComponent implements AfterViewInit {

  users: User[] = new Array<User>();
  displayedColumns: string[] = ['id', 'lastName' ,'firstName', 'middleName', 'isActive', 'settings']
  dataSource = new MatTableDataSource(this.users);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private userService: UserService) { }

  ngAfterViewInit() {
    this.refreshData()
    
  }

  refreshData(){
    this.userService.getUsers().subscribe( data => {
      this.users = data


      this.dataSource.data = this.users;

    })
  }

}
