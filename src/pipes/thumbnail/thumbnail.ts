import { Pipe, PipeTransform } from '@angular/core';
import { MediaProvider } from '../../providers/media/media';
import { Pic } from '../../interfaces/pic';

/**
 * Generated class for the ThumbnailPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'thumbnail'
})
export class ThumbnailPipe implements PipeTransform {
  private cachedId: number;
  private thumbnail = '';

  constructor(private mediaProvider: MediaProvider) {}
  /**
   * Takes a value and makes it lowercase.
   */
  async transform(value: number, ...args) {
    return new Promise((resolve, reject) => {
      this.mediaProvider.getSingleMedia(value).subscribe((data: Pic) => {
        switch (args[0]) {
          case 'medium':
            resolve(data.thumbnails['w320']);
            break;
          case 'large':
            resolve(data.thumbnails['w640']);
            break;
          case 'screenshot':
            resolve(data.screenshot);
            break;
          default:
            resolve(data.thumbnails['w160']);
            break;
        }
      });
    });
  }
}
