import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(@Inject(Router) private router: Router) {}
  redirigir() {
    this.router.navigate(['/registrar-incidencia']);
  }
  ngOnInit() {}
}
