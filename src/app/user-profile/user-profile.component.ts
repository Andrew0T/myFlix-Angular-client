import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
  })

export class UserProfileComponent implements OnInit {
  user: any = {};
  initialInput: any = {};
  
  @Input() userData = { 
    Username: '',
    Password: '',
    Email: '',
    Birthday: ''
  };
  
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
  ){}

    ngOnInit(): void {
      this.getUserInfo();
    }

  /**
   * Fetch user data from API user json
   * @return user object
   * @function getUserInfo
   */
    getUserInfo(): void {
      this.fetchApiData.getUser().subscribe((result) => {
        this.user = result;
        console.log(this.user);
        this.userData.Username = this.user.Username;
        this.userData.Password = this.user.Password;
        this.userData.Email = this.user.Email;
        this.userData.Birthday = this.user.Birthday;
        console.log(this.userData);
        return this.user;
      });
    }

  /**
   * Update user profile, change username, password, email and/or birthday
   * @function updateProfile
   */
    updateProfile(): void{
      this.fetchApiData.editUser(this.userData).subscribe((result) => {
        console.log(result);
        this.snackBar.open('User Profile updated', 'OK', {
            duration: 3000
        });
        if (this.user.Username !== result.Username) {
          localStorage.clear();
          this.router.navigate(['welcome']);
          this.snackBar.open('Please login again', 'OK', {
            duration: 3000
          });
        }
      });
    }

    /**
     * Delete logged in User account and return to Welcome page
     * @function deleteUser
     */
    deleteUser(): void {
      if (confirm('Are you sure you want to delete your account?')) {
        this.router.navigate(['welcome']).then(() => {
          this.snackBar.open('Your account was successfully deleted! Sorry to see you go!','Ok', {
            duration: 3000 
          });
        })
        this.fetchApiData.deleteUser().subscribe((result) => {
          console.log(result);
          localStorage.clear();
        })
      }
    }
}
