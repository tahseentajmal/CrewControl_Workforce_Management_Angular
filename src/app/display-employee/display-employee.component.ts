import { Component,EventEmitter,Input,OnInit, Output } from '@angular/core';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit {

  @Input() employee: Employee
  @Output() onRemoveEmployee = new EventEmitter<number>();
  @Output() onEditEmployee = new EventEmitter<number>();

  constructor(){
    this.employee = {
      firstName: '',
      lastName: '',
      birthDate: '',
      gender: '',
      education: '',
      company: '',
      jobExperience: 0,
      salary: 0,
      profile:'',
    }
  }

  ngOnInit(): void {
    console.log(this.employee);
    
  }

  deleteEmployeeClicked(){
    this.onRemoveEmployee.emit(this.employee.id)
  }

  editEmployeeClicked(){
    this.onEditEmployee.emit(this.employee.id)
  }
}
