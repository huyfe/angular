import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { AuthserviceService } from '../service/authservice.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authService: AuthserviceService, private serviceAPI: ApiService, private location: Location) { }

  ngOnInit(): void {

  }

  onSubmit(form: NgForm) {
    let email = form.value.email;
    let password = form.value.password;
    this.authService.signUp(email, password).subscribe(res => {
      console.log(res);
      // Nếu đăng ký thành công thì auto đăng nhập
      if (res) {
        this.authService.signIn(email, password).subscribe(res => {
          console.log(res);
          this.authService.setToken(res.accessToken);
          console.log("Token is: " + localStorage.getItem('userData'));
          if (res.message == "Login thanh cong") {
            window.location.href = "home";
          }
        },
          error => {
            console.log(error);
          }
        )
      }
    },
      error => {
        console.log(error);
      }
    )
    form.reset();
  }
}
