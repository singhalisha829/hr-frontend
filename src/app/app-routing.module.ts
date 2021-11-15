
import { AttendanceComponent } from './attendance/attendance.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { OfferComponent } from './offer/offer.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { setFullYear } from 'ngx-bootstrap/chronos/utils/date-setters';
import { SickLeaveComponent } from './sick-leave/sick-leave.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { NoticeComponent } from './notice/notice.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeaveCalendarComponent } from './leave-calendar/leave-calendar.component';
import { ApplicationFormComponent } from './application-form/application-form.component';

const routes: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
  },
    {
      path: '',
      component:HomeComponent,
      children: [
        {
        path: '',
          redirectTo: 'welcome',
          pathMatch: 'full',
        },
        {
          path: 'welcome',
          component: WelcomeComponent,
        },
  {
    path:'attendance',
    component:AttendanceComponent
  },
  {
    path:'employee',
    component:EmployeeComponent
  },
  {
    path:'offer-letter',
    component:OfferComponent
  },
  {
    path:'sick-leave',
    component:SickLeaveComponent
  },
  {
    path:'appointment',
    component:AppointmentComponent
  },
  {
    path:'notice',
    component:NoticeComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent
  },
  {
    path:'leave-calendar',
    component:LeaveCalendarComponent
  },
  {
    path:'application-form',
    component:ApplicationFormComponent
  },]
},
{path: '**', pathMatch: 'full', component: LoginComponent}
];

export const componentsArr = [
  LoginComponent, HomeComponent, AttendanceComponent, OfferComponent, WelcomeComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
