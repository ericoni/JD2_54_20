import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ AuthService ]
})
export class AppComponent {
  title = 'app';
  voce = [
    { boja: "crvena", naziv: "jabuka" },
    { boja: "crvena", naziv: "jagoda" },
    { boja: "zuta", naziv: "limun" }
  ];

  constructor(private authService: AuthService) {
  }


  public clickedItem = { name: "" };
  onItemClicked(Item) {
    this.clickedItem = Item;
  }

  isLoggedIn(): boolean{
        return this.authService.isLoggedIn();
  }

  getUserRole(): any{
    let user = JSON.parse(localStorage.getItem("currentUser"));
    console.log("Rola je: " + user.role);
    return user.role;
  }

  logout(): void {
        this.authService.logout();
    }
}

