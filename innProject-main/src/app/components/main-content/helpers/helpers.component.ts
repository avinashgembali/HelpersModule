import { Component, OnInit } from '@angular/core';
import { Helper } from '../../../shared/helper';
import { HelperService } from '../../../shared/helper.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { NgFor, NgIf } from '@angular/common';
import { SelectedHelperComponent } from '../selected-helper/selected-helper.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-helpers',
  standalone: true,
  imports: [MatIconModule, CommonModule, NgFor, NgIf, SelectedHelperComponent],
  templateUrl: './helpers.component.html',
  styleUrl: './helpers.component.scss',
})
export class HelpersComponent implements OnInit {
  @Input() helpers: Helper[] = [];
  @Input() selectedHelper?: Helper;

  constructor(
    private helperService: HelperService,
    private route: ActivatedRoute,
    private router: Router,
    private location : Location,
  ) {}

  ngOnInit(): void {
  }

  onHelperDeleted() {
    this.helperService.getHelpers().subscribe((response) => {
      this.helpers = response.data;

      if (this.helpers.length > 0) {
        // Auto-select the first available helper
        this.selectedHelper = this.helpers[0];
        this.router.navigate(['/helpers', this.selectedHelper.id]);
      } else {
        // No helpers left
        this.selectedHelper = undefined;
        this.location.go('/helpers/not-found');
      }
    });
  }

  selectHelper(helper: Helper) {
    this.selectedHelper = helper;
    this.router.navigate(['/helpers', helper.id]); // Update URL
  }

  getInitials(name?: string): string {
    if (!name) return '';
    return name.replace(/\s+/g, '').substring(0, 2).toUpperCase();
  }
}
