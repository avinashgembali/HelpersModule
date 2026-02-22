import { Component } from '@angular/core';
import { AdditionalDialogComponent } from '../additional-dialog/additional-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormGroup, FormControl } from '@angular/forms';
import { Input } from '@angular/core';
@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [MatIconModule, CommonModule, MatButtonModule],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
})
export class DocumentsComponent {
  @Input() fileexistname: string | undefined = '';
  constructor(public dialog: MatDialog) {}
  form = new FormGroup({
    additionalDocument: new FormControl<{
      category: string;
      fileName: string;
    } | null>(null),
  });
  openUploadDialog(): void {
    const dialogRef = this.dialog.open(AdditionalDialogComponent, {
      width: '500px', // Adjust width as needed
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const patchValue = {
          category: result.category,
          fileName: result.file?.name || '',
        };
        this.form.patchValue({ additionalDocument: patchValue });
        console.log('Dialog result:', result);
        // Handle the selected category and file here (e.g., upload the file)
      }
    });
  }

  getFormData(): any {
    return this.form.value;
  }

  removeDocument(): void {
    this.form.patchValue({ additionalDocument: null });
    this.fileexistname = ''
  }

  isFormValid(): boolean {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return false;
    }
    return true;
  }
}
