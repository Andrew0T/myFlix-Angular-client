import { Component, OnInit, Input } from '@angular/core';

// This import closes the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
      public fetchApiData: FetchApiDataService,
      public dialogRef: MatDialogRef<UserLoginFormComponent>,
      public snackBar: MatSnackBar) { }
  
  ngOnInit(): void {
  }
  
  // This is the function responsible for sending the form inputs to the backend
  loginUser(): void {
      this.fetchApiData.userLogin(this.userData).subscribe((result) => {
        console.log(result);
  // Logic for a successful user login goes here! (To be implemented)
        localStorage.setItem('user', result.user.Username);
        localStorage.setItem('token', result.token);
  // This will close the modal on success!
        this.dialogRef.close();
       this.snackBar.open(`Welcome back ${this.userData.Username} `, 'OK', {
          duration: 2000
       });
      }, (result) => {
        console.log(result);
        this.snackBar.open(result, 'OK', {
          duration: 2000
        });
      });
    }
  
}
