import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'http://localhost:3000/'

  constructor(private http: HttpClient) { }

  getAPI(endPoint: string) {
    let url = this.baseUrl + endPoint;
    return this.http.get<any>(url);
  }

  getByID(endPoint: string, id: number) {
    let url = this.baseUrl + endPoint + "/" + id;
    return this.http.get<any>(url);
  }

  addAPI(endPoint: string, data: any) {
    let url = this.baseUrl + endPoint;
    return this.http.post(url, data);
  }

  deleteAPI(endPoint: string, id: number) {
    let url = this.baseUrl + endPoint + "/" + id;
    return this.http.delete(url);
  }

  editAPI(endPoint: string, id: number, data: any) {
    let url = this.baseUrl + endPoint + "/" + id;
    return this.http.put(url, data);
  }

}
