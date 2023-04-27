import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Dialog component for displaying movie details
 */
@Component({
  selector: 'app-director-view',
  templateUrl: './director-view.component.html',
  styleUrls: ['./director-view.component.scss']
})
export class DirectorViewComponent implements OnInit{
  
  /**
   * @constructor is used to set dependencies
   * @param data - specific director info, received from moviecard via MAT_DIALOG_DATA
   * @property Name - name of director
   * @property Bio - short biography of director
   * @property Birth - year of birth
   * @property Death? - year of death, if relevant
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
      public data:{
        Name: string;
        Bio: string;
        Birth: string;
        Death?: string;
      }
    ){}
      
    ngOnInit(): void {}
}
