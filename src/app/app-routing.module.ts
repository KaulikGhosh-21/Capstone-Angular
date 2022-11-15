import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { RegisterComponent } from './components/register/register.component';
import { SigninComponent } from './components/signin/signin.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: "signin",
        component: SigninComponent
      },
      {
        path: "register",
        component: RegisterComponent
      },
      {
        path: "about-us",
        component: AboutUsComponent
      },
      {
        path: "contact-us",
        component: ContactUsComponent
      },
      {
        path: "feedback",
        component: FeedbackComponent
      },
      {
        path: "employees",
        component: UsersComponent
      },
      {
        path: "employees/add-employee",
        component: AddEmployeeComponent
      },
      {
        path: "employees/edit/:empId",
        component: EditEmployeeComponent
      },
      {
        path: "employees/detail/:empId",
        component: EmployeeDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
