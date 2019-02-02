import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { HomePage } from '../home/home';
import { User } from '../../interfaces/user';
import { FileByTag } from '../../interfaces/pic';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user: User = {
    username: '',
    email: ''
  };
  profileImage: FileByTag = {
    filename: ''
  };
  uploadUrl = 'https://media.mw.metropolia.fi/wbma/uploads/';

  constructor(public navCtrl: NavController, public navParams: NavParams, private mediaProvider: MediaProvider) {
  }

  ionViewWillEnter() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.mediaProvider.getProfileImage().subscribe((data: FileByTag[]) => {
      this.profileImage = data.filter((item: FileByTag) => item.user_id === this.user.user_id)[0];
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.mediaProvider.setLoggedInStatus(false);
    this.navCtrl.parent.select(0);
  }
}
