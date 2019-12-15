import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from 'src/abstractions/country';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private paths = {
    0: "country",
    1: "club"
  }
  constructor(
    private readonly router: Router
  ) { }

  public goLink(index: number) {
    this.router.navigateByUrl(`/${this.paths[index]}`);
  }
}
