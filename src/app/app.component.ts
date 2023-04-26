import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Employee } from './models/employee.model';
import { EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('fileInput') fileInput: any; // To access template variable for file upload
  @ViewChild('addEmployeeButton') addEmployeeButton: any; // To access template variable for add employee
  title = 'CrewControl_Worforce_Management';

  employeeForm: FormGroup;

  employee: Employee[]; // To store data on backend
  employeesToDisplay: Employee[]; // To display data on frontend

  educationOptions = [
    '10th Grade',
    'Diploma',
    "UnderGraduate",
    'PostGraduate',
    "Doctorate"

  ]
  constructor(private fb: FormBuilder, private emp: EmployeeService) {
    this.employeeForm = fb.group({});
    this.employee = [];
    this.employeesToDisplay = this.employee
  }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      firstName: this.fb.control(''),
      lastName: this.fb.control(''),
      birthDate: this.fb.control(''),
      gender: this.fb.control(''),
      education: this.fb.control('default'),
      company: this.fb.control(''),
      jobExperience: this.fb.control(''),
      salary: this.fb.control(''),
    })

    this.emp.getEmployees().subscribe((data: any) => {
      console.log(data);
      for (let emp of data) {
        this.employee.unshift(emp)
      }
      this.employeesToDisplay = this.employee
    })
  }

  ngAfterViewInit(): void {
    // this.buttontemp.nativeElement.click()
  }

  addEmployee() {
    let employee: Employee = {
      firstName: this.FirstName.value,
      lastName: this.LastName.value,
      birthDate: this.BirthDate.value,
      gender: this.Gender.value,
      education: this.educationOptions[parseInt(this.Education.value)],
      company: this.Company.value,
      jobExperience: this.JobExperience.value,
      salary: this.Salary.value,
      profile: this.fileInput.nativeElement.files[0]?.name
    }
    this.emp.postEmployees(employee).subscribe((data: any) => {
      this.employee.unshift(data);
      this.clearForm()
    })
  }

  removeEmployee(event: any) {
    this.employee.forEach((val, index) => {
      if (val.id == parseInt(event)) {
        this.emp.deleteEmployee(event).subscribe((res) => {
          this.employee.splice(index, 1);
        })
      }
    })
  }
  // method to edit employee details
  editEmployee(event: any) {
    this.employee.forEach((val, index) => {
      if (val.id == event) {
        this.setForm(val)
      }
    })
    this.removeEmployee(event)
    this.addEmployeeButton.nativeElement.click();
  }

  // method to search employee details
  searchEmployees(event: any) {
    let filteredEmployees: Employee[] = [];
    if (event == '') {
      this.employeesToDisplay = this.employee
      // Display all employees if search bar is empty
    } else {
      filteredEmployees = this.employee.filter((val, index) => {
        let targetKey = val.firstName.toLowerCase() + '' + val.lastName.toLowerCase();
        let searchkey = event.toLowerCase()
        return targetKey.includes(searchkey) // return employee if employee name includes searchKey (bool)
      })
      this.employeesToDisplay = filteredEmployees
    }
  }

  // function to set form for edit employee method
  setForm(empl: Employee) {
    this.FirstName.setValue(empl.firstName);
    this.LastName.setValue(empl.lastName);
    this.BirthDate.setValue(empl.birthDate);
    this.Gender.setValue(empl.gender);

    let educationIndex = 0 // to access value from dropdown
    this.educationOptions.forEach((val, index) => {
      if (val == empl.education) {
        educationIndex = index;
      }
    })

    this.Education.setValue(educationIndex);
    this.Company.setValue(empl.company);
    this.JobExperience.setValue(empl.jobExperience);
    this.Salary.setValue(empl.salary);
    this.fileInput.nativeElement.value = '';
  }

  // function to clear form after submit 
  clearForm() {
    this.FirstName.setValue('');
    this.LastName.setValue('');
    this.BirthDate.setValue('');
    this.Gender.setValue('');
    this.Education.setValue('');
    this.Company.setValue('');
    this.JobExperience.setValue('');
    this.Salary.setValue('');
    this.fileInput.nativeElement.value = '';
  }

  // Getter functions to access values from employeeForm
  public get FirstName(): FormControl {
    return this.employeeForm.get('firstName') as FormControl
  }
  public get LastName(): FormControl {
    return this.employeeForm.get('lastName') as FormControl
  }
  public get BirthDate(): FormControl {
    return this.employeeForm.get('birthDate') as FormControl
  }
  public get Gender(): FormControl {
    return this.employeeForm.get('gender') as FormControl
  }
  public get Education(): FormControl {
    return this.employeeForm.get('education') as FormControl
  }
  public get Company(): FormControl {
    return this.employeeForm.get('company') as FormControl
  }
  public get JobExperience(): FormControl {
    return this.employeeForm.get('jobExperience') as FormControl
  }
  public get Salary(): FormControl {
    return this.employeeForm.get('salary') as FormControl
  }

}
