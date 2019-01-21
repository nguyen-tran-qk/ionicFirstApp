import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  picArray: any[];
  configUrl = 'https://media.mw.metropolia.fi/wbma';

  constructor(private http: HttpClient) {
    this.getData();
  }

  getData() {
    this.http.get<any>('/assets/test.json').subscribe((data: any) => {
      console.log(data);
      this.picArray = data;
    });
  }
}
