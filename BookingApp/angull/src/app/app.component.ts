import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  voce = [
    { boja: "crvena", naziv: "jabuka" },
    { boja: "crvena", naziv: "jagoda" },
    { boja: "zuta", naziv: "limun" }
  ];
}
