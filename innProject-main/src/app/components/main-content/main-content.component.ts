import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HelpersComponent } from './helpers/helpers.component';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Helper } from '../../shared/helper';
import { HelperService } from '../../shared/helper.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [
    MatIconModule,
    HelpersComponent,
    RouterModule,
    MatMenuModule,
    MatButtonModule,
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatPseudoCheckboxModule,
    FormsModule,
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss',
})
export class MainContentComponent implements OnInit {
  helpers: Helper[] = [];
  selectedHelper?: Helper;
  selectedSort: string = 'id';
  services: string[] = ['Maid', 'Cook', 'Driver', 'Nurse'];
  organizations: string[] = ['ASBL', 'Spring Helpers'];

  selectedServices: string[] = [];
  selectedOrganizations: string[] = [];
  allHelpers: Helper[] = []; // unfiltered master list

  constructor(
    private helperService: HelperService,
    private route: ActivatedRoute,
    private router: Router,
    private location:Location
  ) {}

  ngOnInit(): void {
    this.helperService.getHelpers().subscribe({
      next: (response) => {
        this.allHelpers = response.data;
        this.helpers = [...this.allHelpers];

        // Route-based auto-selection logic
        const idFromRoute = Number(this.route.snapshot.paramMap.get('id'));
        if (idFromRoute) {
          const match = this.helpers.find((h) => h.id === idFromRoute);
          if (match) {
            this.selectedHelper = match;
          }
        } else if (this.helpers.length > 0) {
          this.selectedHelper = this.helpers[0];
          this.router.navigate(['/helpers', this.selectedHelper.id]); // optional
        }
      },
      error: (err) => {
        console.error('Error Fetching Helpers', err);
      },
    });
  }

  sortByName() {
    this.selectedSort = 'name';
    this.helpers.sort((a, b) => a.name.localeCompare(b.name));
  }

  sortByID() {
    this.selectedSort = 'id';
    this.helpers.sort((a, b) => a.id - b.id);
  }

  applyFilters() {
    this.updateHelpersList();
  }

  resetFilters() {
    this.selectedServices = [];
    this.selectedOrganizations = [];
    this.helpers = [...this.allHelpers];

    if (this.helpers.length > 0) {
      this.selectedHelper = this.helpers[0];
      this.router.navigate(['/helpers', this.selectedHelper.id]);
    }
  }

  getSelectedServicesDisplay(): string {
    const selected = this.selectedServices || [];
    if (selected.length === 0) return 'Select Service';
    if (selected.length === 1) return selected[0];

    return `${selected[0]}, +${selected.length - 1} more`;
  }

  getSelectedOrganizationsDisplay(): string {
    const selected = this.selectedOrganizations || [];
    if (selected.length === 0) return 'Select Organization';
    if (selected.length === 1) return selected[0];

    return `${selected[0]}, +${selected.length - 1} more`;
  }

  toggleSelectAllServices() {
    if (this.isAllServicesSelected()) {
      this.selectedServices = [];
    } else {
      this.selectedServices = [...this.services];
    }
  }
  toggleSelectAllOrganizations() {
    if (this.isAllOrganizationsSelected()) {
      this.selectedOrganizations = [];
    } else {
      this.selectedOrganizations = [...this.organizations];
    }
  }

  isAllServicesSelected(): boolean {
    return (
      this.services.length > 0 &&
      this.services.every((service) => this.selectedServices.includes(service))
    );
  }

  isAllOrganizationsSelected(): boolean {
    return (
      this.organizations.length > 0 &&
      this.organizations.every((org) =>
        this.selectedOrganizations.includes(org)
      )
    );
  }

  searchText = '';

  filterHelpers() {
    this.updateHelpersList();
  }

  // Unified filter/search logic
  private updateHelpersList() {
    const text = this.searchText.trim().toLowerCase();
    this.helpers = this.allHelpers.filter((helper) => {
      const matchesService =
        this.selectedServices.length === 0 ||
        this.selectedServices.includes(helper.role);
      const matchesOrg =
        this.selectedOrganizations.length === 0 ||
        this.selectedOrganizations.includes(helper.organization);
      const matchesSearch =
        !text ||
        helper.id.toString().includes(text) ||
        helper.name.toLowerCase().includes(text) ||
        helper.mobileNo.toLowerCase().includes(text);

      return matchesService && matchesOrg && matchesSearch;
    });

    if (this.helpers.length === 0) {
      this.selectedHelper = undefined;
      this.location.go('/helpers/not-found');
    } else {
      this.selectedHelper = this.helpers[0];
      this.router.navigate(['/helpers', this.selectedHelper.id]);
    }
  }

  isFilterApplied(): boolean {
    const text = this.searchText.trim().toLowerCase();

    return (
      this.selectedServices.length > 0 ||
      this.selectedOrganizations.length > 0 ||
      text.length > 0
    );
  }
}
