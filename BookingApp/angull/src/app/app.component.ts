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

  public clickedItem = { name: "" };
  onItemClicked(Item) {
    this.clickedItem = Item;
  }

  isLoggedIn(): boolean{
        if (localStorage.getItem('currentUser') === null){
            return false;
        }
        else{
            return true;
        }
  }

  getUserRole(): any{
    let user = JSON.parse(localStorage.getItem("currentUser"));
    console.log("Rola je: " + user.role);
    return user.role;
  }

  logout(): void {
        // clear token remove user from local storage to log user out
        //this.token = null;
        localStorage.removeItem('currentUser');
    }
}

