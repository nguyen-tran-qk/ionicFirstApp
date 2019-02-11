import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { HomePage } from '../home/home';
import { LoggedInResponse, RegisteredResponse, User } from '../../interfaces/user';

/**
 * Generated class for the LoginRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login-register',
  templateUrl: 'login-register.html',
})
export class LoginRegisterPage {
  user: User = {
    username: null
  };
  isLoginPage = true;
  existedUsername = false;
  passwordNotMatched = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private mediaProvider: MediaProvider, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginRegisterPage');
  }

  login() {
    if (this.user.username && this.user.password) {
      this.mediaProvider.login(this.user).subscribe((data: LoggedInResponse) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          this.mediaProvider.setLoggedInStatus(true);
          this.navCtrl.parent.select(0);
        }
      });
    }
  }

  toggleLoginRegister() {
    this.isLoginPage = !this.isLoginPage;
  }

  register() {
    if (this.user.username && this.user.password && this.user.email) {
      delete this.user.confirmPassword;
      this.mediaProvider.register(this.user).subscribe((data: RegisteredResponse) => {
        if (data.user_id) {
          this.isLoginPage = true;
        }
      });
    }
  }

  checkUsername() {
    this.mediaProvider.checkUsername(this.user.username).subscribe((data: { username: string, available: boolean }) => {
      if (!data.available) {
        this.existedUsername = true;
        const toast = this.toastCtrl.create({
          message: 'Username already exists.',
          duration: 3000
        });
        toast.present();
      } else {
        this.existedUsername = false;
      }
    });
  }

  checkPasswordMatch() {
    if (this.user.password && this.user.confirmPassword) {
      if (this.user.password !== this.user.confirmPassword) {
        this.passwordNotMatched = true;
        const toast = this.toastCtrl.create({
          message: 'Confirm password does not match your password.',
          duration: 3000
        });
        toast.present();
      } else {
        this.passwordNotMatched = false;
      }
    }
  }

}
