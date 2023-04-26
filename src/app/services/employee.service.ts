import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Employee } from '../models/employee.model';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl = 'http://localhost:3000/posts'

  constructor(private http: HttpClient) { }

  // Http Requests

  // To get employee 
  getEmployees() {
    return this.http.get<Employee[]>(this.baseUrl); // <Employee[]> -> Type Parameter
  }

  // to add employee
  postEmployees(employee: Employee) { // expects instance of class employee
    return this.http.post<Employee>(this.baseUrl, employee)
  }

  // to delete employee
  deleteEmployee(id: string) {
    return this.http.delete(this.baseUrl + '/' + id)
  }

}
