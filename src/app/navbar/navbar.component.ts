import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor( public router: Router){}
  ngOnInit(): void {}

  /**
   * Navigates to movies page
   * @function toMovies
   */
  toMovies(): void { this.router.navigate(['movies']);}

/**
   * Navigates to profile page
   * @function updateProfile
   */
  toProfile(): void {this.router.navigate(['profile']);}

  /**
   * User is logged out and clears token from local storage
   * @function logout
   */
  logout(): void {this.router.navigate(['welcome']);localStorage.clear();}
}
