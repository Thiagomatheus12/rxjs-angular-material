import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout'
import { pluck } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  isSmallScren = false;

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  constructor(private breakpointObserver: BreakpointObserver) { }

  /**
   * Função para observar se a tela tem o width setado.
   */
  ngAfterContentInit(): void {
    this.breakpointObserver.observe(['(max-width: 800px)'])
    .subscribe((res) => this.isSmallScren = res.matches);
  }

  get sidenavMode() {
    return this.isSmallScren ? 'over' : 'side'
  }
}
