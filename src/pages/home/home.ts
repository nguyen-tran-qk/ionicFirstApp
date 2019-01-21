import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Pic } from '../../interfaces/pic';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  picArray: Pic[];
  configUrl = 'https://media.mw.metropolia.fi/wbma';

  constructor(private http: HttpClient, private photoViewer: PhotoViewer) {
  }

  getData() {
    return this.http.get<Pic[]>(this.configUrl + '/media');
  }

  showImage(image) {
    this.photoViewer.show(image);
  }

  ngOnInit() {
    this.getData().subscribe((data: Pic[]) => {
      console.log(data);
      this.picArray = data;
    });
  }
}
