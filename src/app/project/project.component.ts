import { Location } from '@angular/common';
import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import jwt_decode from "jwt-decode";
import { ApiService } from '../service/api.service';
import { AuthserviceService } from '../service/authservice.service';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  user: any;

  showProject = false;

  endPoint: string = "projects/projects";

  hideProject() {
    this.showProject = !this.showProject;
  }

  showEdit = false;

  hideEditProject() {
    this.showEdit = !this.showEdit;
  }

  page: number = 1;// Để làm pagination

  listProjects: any;

  projectForm!: FormGroup;

  constructor(private serviceAPI: ApiService, private location: Location, public auth: AuthserviceService) { }

  ngOnInit(): void {
    this.loadData();

    this.projectForm = new FormGroup({
      'projectName': new FormControl('', Validators.required),
      'dateOfStart': new FormControl('', Validators.required),
      "teamSize": new FormControl('', Validators.required)
    })

    this.checkRole();
  }


  loadData() {
    this.serviceAPI.getAPI(this.endPoint).subscribe(data => {
      this.listProjects = data.projects;
      console.log(this.listProjects);

    }, error => {
      console.log(error);
    });
  }

  addProject() {
    this.showProject = !this.showProject;
  }

  submitAdd() {
    if (this.projectForm.invalid) {
      console.log('Invalid');
      return;
    }

    let data = this.projectForm.value;
    this.serviceAPI.addAPI(this.endPoint, data).subscribe(data => {
      window.location.reload();
    }, error => {
      console.log(error);
    });
  }

  project: any;

  projectIDForm!: FormGroup;

  editProject(id: any) {
    this.showEdit = !this.showEdit;
    this.serviceAPI.getByID(this.endPoint, id).subscribe(data => {
      this.project = data.project;
      console.log(this.project);
      this.projectIDForm = new FormGroup({
        'projectNameID': new FormControl(`${this.project.projectName}`, Validators.required),
        'dateOfStartID': new FormControl(`${this.project.dateOfStart}`, Validators.required),
        "teamSizeID": new FormControl(`${this.project.teamSize}`, Validators.required)
      })
    })
  }

  submitEdit(id: any) {
    if (this.projectIDForm.invalid) {
      console.log('Invalid');
      return;
    }

    let data = this.projectIDForm.value;

    let dataEdit = {
      'projectName': data.projectNameID,
      'dateOfStart': data.dateOfStartID,
      'teamSize': data.teamSizeID
    }

    console.log(dataEdit);

    this.serviceAPI.editAPI(this.endPoint, id, dataEdit).subscribe(res => {
      window.location.reload();
    }, error => {
      console.log(error);
    });
  }

  deleteProject(id: any) {
    this.serviceAPI.deleteAPI(this.endPoint, id).subscribe(data => {
      this.loadData();
    });
  }

  // Kiểm tra phân quyền 
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
