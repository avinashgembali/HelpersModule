import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss',
})
export class ReviewComponent {
  @Input() helperData: any;
  @Input() documentData: any;

  helper: {
    photoName?: string;
    photoPreview?: string;
    name?: string;
    role?: string;
    gender?: string;
    languages?: string[];
    mobileNo?: string;
    emailId?: string;
    kycDocumentName?: string;
    serviceType?: string;
    organization?: string;
    joinedOn?: string;
  } = {};

  ngOnChanges() {
    if (this.helperData || this.documentData) {
      this.helper = {
        photoName: this.helperData?.photo?.name || 'No file uploaded',
        photoPreview: this.helperData?.photoPreview || '',
        name: this.helperData?.fullName || '',
        role: this.helperData?.service || '',
        gender: this.helperData?.gender || '',
        languages: this.helperData?.languages || [],
        mobileNo: this.helperData?.phone || '',
        emailId: this.helperData?.email || '',
        kycDocumentName:
          this.helperData?.kycDocument?.name || 'No file uploaded',
        serviceType: this.helperData?.service || '',
        organization: this.helperData?.organization || '',
        joinedOn: new Date().toLocaleDateString('en-IN'),
      };
    }
  }
  getInitials(name?: string): string {
    if (!name) return '';
    return name.replace(/\s+/g, '').substring(0, 2).toUpperCase();
  }
}
