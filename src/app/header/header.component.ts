import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'})
export class HeaderComponent {


  constructor(private route: ActivatedRoute,
    private router: Router) { }

  onClick() {
    this.router.navigate(['/'], {relativeTo: this.route});
  }

}



