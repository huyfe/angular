import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { AuthserviceService } from '../service/authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthserviceService, private serviceAPI: ApiService, private location: Location) { }
  ngOnInit(): void {
    if (localStorage.getItem('userData')) {
      window.location.href = "home";
    }
  }

  onSubmit(form: NgForm) {
    let email = form.value.email;
    let password = form.value.password;
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
    form.reset();
  }

}
