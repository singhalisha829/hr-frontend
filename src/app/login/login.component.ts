
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/utils/services/login.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = {
    username: '',
    password: ''
  }
  unsubsribeNotifier = new Subject(); // to notify to cancel api when component gets destroyed
  constructor(private loginService: LoginService, private router: Router, private toaster: ToastrService) { }

  ngOnInit(): void {
  }
  onSubmit() {
    // console.log(this.user)
    this.loginService.checkLogin(this.user)
    .pipe(takeUntil(this.unsubsribeNotifier))
    .subscribe((res:any) => {
      if (res.status.code === 200) {
        localStorage.setItem('token', (res.data.output.token || null));
        localStorage.setItem('disabledPermissions', (res.data.output.disabled || []));

        localStorage.setItem('role', (res.data.output.role || null));
        localStorage.setItem('email', (res.data.output.email || null));
        localStorage.setItem('userId', (res.data.output.user_id || null));
        console.log(localStorage)
        this.router.navigate(['welcome'])
      }else{
        this.toaster.error(res.status.description);
      }
    }, (err) => {
      // console.log(err)
    })
  }

  ngOnDestroy() {
    this.unsubsribeNotifier.next()
    this.unsubsribeNotifier.complete()
  }
}
