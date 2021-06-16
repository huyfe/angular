import { Location } from '@angular/common';
import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  // token = localStorage.getItem('userData');

  // user = JSON.parse(this.token as string);

  endPoint: string = "tasks/tasks";

  showTask = false;

  hideTask() {
    this.showTask = !this.showTask;
  }

  showEdit = false;

  hideEditTask() {
    this.showEdit = !this.showEdit;
  }

  page: number = 1;

  listTasks: any;

  listProjects: any;

  taskForm!: FormGroup;

  constructor(private serviceAPI: ApiService, private location: Location) { }

  ngOnInit(): void {
    this.selectProjects();
    this.loadData();

    this.taskForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'project': new FormControl('', Validators.required),
      'assignedTo': new FormControl('', Validators.required),
      'priority': new FormControl('', Validators.required),
      'status': new FormControl('', Validators.required)
    })
  }

  selectProjects() {
    this.serviceAPI.getAPI('projects/projects').subscribe(data => {
      this.listProjects = data.projects;
      console.log(data);
    }, error => {
      console.log(error);
    });
  };

  loadData() {
    this.serviceAPI.getAPI(this.endPoint).subscribe(data => {
      this.listTasks = data.tasks;
      console.log(data);

    }, error => {
      console.log(error);
    });
  };

  addTask() {
    this.showTask = !this.showTask;
  }

  submitAdd() {
    if (this.taskForm.invalid) {
      console.log('Invalid');
      return;
    }

    let data = this.taskForm.value;
    this.serviceAPI.addAPI(this.endPoint, data).subscribe(data => {
      window.location.reload();
    }, error => {
      console.log(error);
    });
  }

  task: any;

  taskIDForm!: FormGroup;

  editTask(id: any) {
    this.showEdit = !this.showEdit;
    this.serviceAPI.getByID(this.endPoint, id).subscribe(data => {
      this.task = data.task;
      console.log(this.task);
      this.taskIDForm = new FormGroup({
        'nameID': new FormControl(`${this.task.name}`, Validators.required),
        'descriptionID': new FormControl(`${this.task.description}`, Validators.required),
        'projectID': new FormControl(`${this.task.project}`, Validators.required),
        'assignedToID': new FormControl(`${this.task.assignedTo}`, Validators.required),
        'priorityID': new FormControl(`${this.task.priority}`, Validators.required),
        'statusID': new FormControl(`${this.task.status}`, Validators.required)
      })
    })
  }

  submitEdit(id: any) {
    if (this.taskIDForm.invalid) {
      console.log('Invalid');
      return;
    }

    let data = this.taskIDForm.value;

    let dataEdit = {
      'name': data.nameID,
      'description': data.descriptionID,
      'project': data.projectID,
      'assignedTo': data.assignedToID,
      'priority': data.priorityID,
      'status': data.statusID
    };

    this.serviceAPI.editAPI(this.endPoint, id, dataEdit).subscribe(res => {
      window.location.reload();
    }, error => {
      console.log(error);
    });
  }

  deleteTask(id: any) {
    this.serviceAPI.deleteAPI(this.endPoint, id).subscribe(data => {
      this.loadData();
    });
  }

}
