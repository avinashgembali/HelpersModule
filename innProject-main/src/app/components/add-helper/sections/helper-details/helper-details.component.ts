import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UploadDialogComponent } from '../upload-dialog/upload-dialog.component';

@Component({
  selector: 'app-helper-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule,
  ],
  templateUrl: './helper-details.component.html',
  styleUrl: './helper-details.component.scss',
})
export class HelperDetailsComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
  ngOnInit() {
    // Watch for changes in "vehicle"
    this.form.get('vehicle')?.valueChanges.subscribe((value) => {
      const vehicleNumberControl = this.form.get('vehicleNumber');

      if (value && value !== 'none') {
        vehicleNumberControl?.setValidators([Validators.required]);
      } else {
        vehicleNumberControl?.clearValidators();
        vehicleNumberControl?.setValue(''); // reset if hidden
      }

      vehicleNumberControl?.updateValueAndValidity();
    });
  }

  form = new FormGroup({
    service: new FormControl<string | null>(null, Validators.required),
    organization: new FormControl<string | null>(null, Validators.required),
    fullName: new FormControl('', Validators.required),
    languages: new FormControl<string[]>([], Validators.required),
    gender: new FormControl('', Validators.required),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{10}$/),
    ]),
    email: new FormControl('', Validators.email),
    vehicle: new FormControl('none'),
    vehicleNumber: new FormControl(''),
    photo: new FormControl<File | null>(null),
    photoPreview: new FormControl<string | ArrayBuffer | null>(null),
    kycDocument: new FormControl<{ category: string; fileName: string } | null>(
      null,
      Validators.required
    ),
  });

  services = [
    { name: 'Maid', icon: 'cleaning_services' },
    { name: 'Cook', icon: 'restaurant' },
    { name: 'Driver', icon: 'drive_eta' },
    { name: 'Nurse', icon: 'medical_services' },
  ];

  organizations = ['ASBL', 'Spring Helpers'];

  languages: string[] = ['Hindi', 'English', 'Telugu'];

  vehicles = ['none', 'Bike', 'Car', 'Auto'];

  selectedImageUrl: string | ArrayBuffer | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result;

        // Patch both file and base64 into the form
        this.form.patchValue({
          photo: file,
          photoPreview: base64Image, // custom control to store preview
        });

        // Also assign to show in this component immediately
        this.selectedImageUrl = base64Image;
      };
      reader.readAsDataURL(file);
    }
  }

  toggleSelectAll() {
    const current = this.form.get('languages')?.value || [];
    if (this.isAllSelected()) {
      this.form.get('languages')?.setValue([]);
    } else {
      this.form.get('languages')?.setValue([...this.languages]);
    }
  }

  isAllSelected(): boolean {
    const selected = this.form.get('languages')?.value || [];
    return (
      this.languages.length > 0 &&
      this.languages.every((lang) => selected.includes(lang))
    );
  }

  getSelectedLanguagesDisplay(): string {
    const selected = this.form.get('languages')?.value || [];

    if (selected.length === 0) return 'Select languages';
    if (selected.length === 1) return selected[0];

    return `${selected[0]} +${selected.length - 1} more`;
  }

  get showVehicleField(): boolean {
    const value = this.form.get('vehicle')?.value;
    return value !== 'none';
  }

  openUploadDialog(): void {
    const dialogRef = this.dialog.open(UploadDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const patchValue = {
          category: result.category,
          fileName: result.file?.name || '',
        };
        this.form.patchValue({ kycDocument: patchValue });
        console.log('Dialog result:', patchValue);
      }
    });
  }

  getFormData(): any {
    console.log(this.form);
    console.log(this.form.value);
    return this.form.value;
  }

  isFormValid(): boolean {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return false;
    }
    return true;
  }

  changeKycDocument(): void {
    this.openUploadDialog(); // Reuse same dialog for changing
  }

  removeKycDocument(): void {
    this.form.patchValue({ kycDocument: null });
  }
  removePhoto() {
    this.selectedImageUrl = null;
    this.form.patchValue({ photo: null, photoPreview: null });
  }
}
