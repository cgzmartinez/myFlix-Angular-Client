// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'

import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { SummaryComponent } from '../summary/summary.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  FavoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getUser().subscribe((res: any) => {
      this.FavoriteMovies = res.FavoriteMovies;
      return this.FavoriteMovies;
    });
  }

  isFav(movieId: string): boolean {
    return this.FavoriteMovies.includes(movieId)
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      // Assign dialog width
      width: '500px'
    });
  }

  openDirectorDialog(name: string, bio: string, birthday: Date): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birthday,
      },
      // Assign dialog width
      width: '500px'
    });

  }

  openSummaryDialog(title: string, description: string): void {
    this.dialog.open(SummaryComponent, {
      data: {
        Title: title,
        Description: description,
      },
      // Assign dialog width
      width: '500px'
    });

  }

  addToFavoriteMovies(movieId: string): void {
    console.log(movieId);
    this.fetchApiData.addFavoriteMovie(movieId).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    })
  }

  removeFromFavoriteMovies(id: string): void {
    console.log(id);
    this.fetchApiData.removeFavoriteMovie(id).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    })
  }

}