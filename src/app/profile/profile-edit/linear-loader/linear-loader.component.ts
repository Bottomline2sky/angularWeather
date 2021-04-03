import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-linear-loader',
  template: '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>',
  styleUrls: ['./linear-loader.component.css']
})
export class LinearLoaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
