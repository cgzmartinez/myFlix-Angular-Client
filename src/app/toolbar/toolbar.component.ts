import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  /** @constructor */
  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  goToMovies(): void {
    this.router.navigate(['movies']);
  }

  goToProfile(): void {
    this.router.navigate(['profile']);
  }

  logOut(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }


}