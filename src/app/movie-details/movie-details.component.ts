import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component for displaying movie details
 */
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
/**
   * @constructor is used to set dependencies
   * @param data - specific movie data, received from moviecard via MAT_DIALOG_DATA
   * @property Title - movie title
   * @property Description - description of the movie
   */
  constructor(

    @Inject(MAT_DIALOG_DATA)
       public data:{
        Title: string;
        Description: string;
       }
    ) {}

    ngOnInit(): void {}
}
