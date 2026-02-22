import { Component } from '@angular/core';
import { SearchComponent } from './search/search.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { RouterLinkActive } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SearchComponent,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    CommonModule,
    RouterLinkActive,
    RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  openStates: { [key: string]: boolean } = {
    resident: false,
    staff: false,
    work: false
  };

  toggleMenu(menuKey: string) {
    this.openStates[menuKey] = !this.openStates[menuKey];
  }
}
