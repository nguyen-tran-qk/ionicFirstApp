import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Pic } from '../../interfaces/pic';
import { MediaProvider } from '../../providers/media/media';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  picArray: Observable<Pic[]>;
  configUrl = 'https://media.mw.metropolia.fi/wbma';

  constructor(
    private http: HttpClient,
    private photoViewer: PhotoViewer,
    private mediaProvider: MediaProvider,
  ) {
  }

  getData() {
    return this.http.get<Pic[]>(this.configUrl + '/media');
  }

  showImage(image) {
    this.photoViewer.show(image);
  }

  getAllFiles() {
    this.picArray = this.mediaProvider.getAllMedia();
  }

  ngOnInit() {
    this.getAllFiles();
  }
}
