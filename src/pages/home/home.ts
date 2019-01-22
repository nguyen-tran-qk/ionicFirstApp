import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Pic } from '../../interfaces/pic';
import { MediaProvider } from '../../providers/media/media';
import { l } from '@angular/core/src/render3';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  picArray: Pic[];
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
    this.mediaProvider.getAllMedia().subscribe((data: Pic[]) => {
      data.forEach((item: Pic) => {
        this.mediaProvider.getSingleMedia(item.file_id).subscribe((file: Pic) => {
          this.picArray.push(file);
        })
      });
    });
  }

  ngOnInit() {
    this.getAllFiles();
  }
}
