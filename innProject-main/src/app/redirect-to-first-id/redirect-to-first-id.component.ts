import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from '../shared/helper.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-redirect-to-first-id',
  standalone: true,
  imports: [],
  templateUrl: './redirect-to-first-id.component.html',
  styleUrl: './redirect-to-first-id.component.scss'
})
export class RedirectToFirstIdComponent implements OnInit {
  constructor(private helperService : HelperService , private router:Router, private location : Location){}

  ngOnInit(): void {
    this.helperService.getHelpers().subscribe({
      next:(response) => {
        const helpers = response.data;
        if(helpers.length > 0){
          this.router.navigate(['/helpers',helpers[0].id]);
        }
        else{
          this.location.go('/helpers/not-found');
        }
      },
      error:() => console.log('error in in redirecting to first id'),
    });
  }
}
