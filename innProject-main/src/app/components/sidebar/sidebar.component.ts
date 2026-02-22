import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchComponent } from './search/search.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { RouterLinkActive, RouterModule, Router } from '@angular/router';
import { SearchService } from './search/search.service';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  action?: () => void;
}

interface MenuGroup {
  key: string;
  title: string;
  items: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SearchComponent,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    CommonModule,
    RouterLinkActive,
    RouterModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit, OnDestroy {
  openStates: { [key: string]: boolean } = {
    resident: false,
    staff: false,
    work: false
  };

  searchQuery = '';
  private sub!: Subscription;

  menuGroups: MenuGroup[] = [
    {
      key: 'resident',
      title: 'RESIDENT MANAGEMENT',
      items: [
        { label: 'Flats', icon: 'home', route: '#' },
        { label: 'Helpdesk Setup', icon: 'build', route: '#' },
        { label: 'Helpdesk Tickets', icon: 'report', route: '#' },
        { label: 'Renovation Works', icon: 'construction', route: '#' },
        { label: 'Violation Setup', icon: 'error', route: '#' },
        { label: 'Amenities', icon: 'sports_soccer', route: '#' }
      ]
    },
    {
      key: 'staff',
      title: 'STAFF MANAGEMENT',
      items: [
        { label: 'Roles & Departments', icon: 'badge', route: '#' },
        { label: 'Staff Directory', icon: 'group', route: '#' },
        { label: 'Helpers', icon: 'person', route: '/helpers' }
      ]
    },
    {
      key: 'work',
      title: 'WORK MANAGEMENT',
      items: [
        { label: 'Assets', icon: 'build_circle', route: '#' },
        { label: 'Locations', icon: 'place', route: '#' },
        { label: 'Work Packages', icon: 'layers', route: '#' },
        { label: 'Work Scheduler', icon: 'event', route: '#' },
        { label: 'Work Logs', icon: 'history', route: '#' },
        { label: 'Issues', icon: 'report_problem', route: '#' }
      ]
    }
  ];

  isCollapsed = false;

  constructor(
    private router: Router,
    private searchService: SearchService,
    private sanitizer: DomSanitizer
  ) {}

  highlight(label: string): SafeHtml {
    if (!this.searchQuery) return label;
    const escaped = this.searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const highlighted = label.replace(
      new RegExp(`(${escaped})`, 'gi'),
      '<mark>$1</mark>'
    );
    return this.sanitizer.bypassSecurityTrustHtml(highlighted);
  }

  ngOnInit() {
    this.sub = this.searchService.searchQuery$.subscribe(q => {
      this.searchQuery = q;
      // Auto-expand groups that have matches when searching
      if (q) {
        this.menuGroups.forEach(group => {
          if (this.getFilteredItems(group).length > 0) {
            this.openStates[group.key] = false; // false = open (your toggle logic)
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  toggleMenu(menuKey: string) {
    this.openStates[menuKey] = !this.openStates[menuKey];
  }

  getFilteredItems(group: MenuGroup): MenuItem[] {
    if (!this.searchQuery) return group.items;
    return group.items.filter(item =>
      item.label.toLowerCase().includes(this.searchQuery)
    );
  }

  isGroupVisible(group: MenuGroup): boolean {
    if (!this.searchQuery) return true;
    return this.getFilteredItems(group).length > 0;
  }

  navigate(item: MenuItem) {
    if (item.route && item.route !== '#') {
      this.router.navigate([item.route]);
    }
  }

  get hasNoResults(): boolean {
    return !!this.searchQuery && this.menuGroups.every(g => !this.isGroupVisible(g));
  }
}