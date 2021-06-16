import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";
import { ApiService } from '../service/api.service';
import { AuthserviceService } from '../service/authservice.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //Liệt kê ra các danh sách cần hiển thi ở phần thống kê
  user: any;
  listUser: any;
  listProject: any;
  listTask: any;

  constructor(private serviceAPI: ApiService, public auth: AuthserviceService) { }

  ngOnInit(): void {
    this.checkRole();
  }

  // Show all user here

  // Show all project here 

  // Show all task here

  // Show all task complete here

  checkRole(): void {
    const token = this.auth.getToken();
    var tokenPayload: any;
    if (token) {
      tokenPayload = jwt_decode(token);
      console.log(tokenPayload.typeUser);
      this.user = {
        role: tokenPayload.typeUser,
        name: tokenPayload.email
      }
    }
  }
}
