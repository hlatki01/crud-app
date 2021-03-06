import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { RocketchatService } from 'src/app/services/rocketchat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: any = {};

  constructor(
    private rocketServices: RocketchatService,
    private userService: UserService,
    private matSnack: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
    if (this.userService.isStaticLogged) {
      return this.router.navigateByUrl('/home');
    }
  }

  async rocketChatCheckIfUserExists(){
    const result = await this.rocketServices.getRocketChatUserToken();

   }


  async login(): Promise<void> {
    const result = await this.userService.login(this.form.email, this.form.password);
    console.log(result);
    if (result.success) {
      this.userService.configureLogin(result);
      this.rocketChatCheckIfUserExists()
      this.router.navigateByUrl('/home');
    } else {
      this.matSnack.open('E-mail ou senha incorretos', undefined, { duration: 2000 });
    }
  }

}
