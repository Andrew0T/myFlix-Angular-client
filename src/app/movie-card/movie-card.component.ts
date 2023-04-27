import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit{
  movies: any[] = [];
  favorites: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
    ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavorites();
  }

  /**
   * Fetch movies via API and set movies state to returned JSON file
   * @returns array holding movies objects
   * @function getMovies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  // /**
  //  * Fetch user info via API and set favorites state to returned JSON file
  //  * @returns array holding IDs of favorites
  //  * @function getFavorites
  //  */
  getFavorites(): any {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies;
      console.log(this.favorites);
      return this.favorites;
    });
  }

  /**
   * Checks if a movie is included in a user's favorite movies
   * @param id
   * @returns boolean
   * @function isFavorite
   */
  isFavorite(id: string): boolean{
    return this.favorites.includes(id);
  }

  /**
   * Adds a movie from a user's favorites via an API call
   * @param id
   * @function addToFavorite
   */
  addFavorite(id: string): void{
    console.log(id);
    this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {
      console.log(result);
      this.snackBar.open('Movie added to Favorites', 'OK', {
        duration: 3000,
      });
      this.ngOnInit();
    });
  }

  /**
   * Removes a movie from a user's favorites via an API call
   * @param id
   * @function removeFromFavorite
   */
  removeFavorite(id: string): void{
    this.fetchApiData.deleteFavoriteMovie(id).subscribe((result) => {
      console.log(result);
      this.snackBar.open('Movie removed from Favorites', 'OK', {
        duration: 3000,
      });
      this.ngOnInit();
    });
  }

  /**
   * Opens director information from DirectorComponent
   * @param name
   * @param bio
   * @param birth
   * @param death?
   * @function openDirector
   */
  openDirector(name: string, bio: string, birth: string, death?: string ): void{
    this.dialog.open(DirectorViewComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
        Death: death,
      },
    });
  }

  /**
   * Opens genre information from GenreComponent
   * @param name
   * @param description
   * @function openGenre
   */
  openGenre(name: string, description: string): void {
    this.dialog.open(GenreViewComponent,{
      data: {
        Name: name,
        Description: description,
      },
    });
  }

  /**
   * Opens movie details from MovieDetailsComponent
   * @param {string} title
   * @param {string} description
   * @function openSynopsis
   */
  openSynopsis(title: string, description: string): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        Title: title,
        Description: description,
      },
    })
  }

}
