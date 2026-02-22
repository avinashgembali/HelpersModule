import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Helper } from '../../../shared/helper';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { HelperQrComponent } from '../../add-helper/helper-qr/helper-qr.component';
import { Router } from '@angular/router';
import { HelperService } from '../../../shared/helper.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-selected-helper',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './selected-helper.component.html',
  styleUrl: './selected-helper.component.scss',
})
export class SelectedHelperComponent {
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private helperService: HelperService,
  ) {}

  @Input({ required: true }) selectedHelper!: Helper;
  @Output() helperDeleted = new EventEmitter<void>(); // ✅ Event emitter

  openQr() {
    this.dialog.open(HelperQrComponent, {
      width: '500px',
      height: '500px',
      data: this.selectedHelper,
    });
  }

  getInitials(name?: string): string {
    if (!name) return '';
    return name.replace(/\s+/g, '').substring(0, 2).toUpperCase();
  }

  editHelper() {
    if (this.selectedHelper?.id) {
      this.router.navigate(['/helpers/edit', this.selectedHelper.id]);
    } else {
      console.warn('No helper selected to edit.');
    }
  }

  deleteHelper() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      height : '175px',
      data: { name: this.selectedHelper.name , role : this.selectedHelper.role },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.helperService.deleteHelper(this.selectedHelper.id).subscribe({
          next: () => {
            this.helperDeleted.emit(); // ✅ Notify parent
          },
          error: (err) => {
            console.error('Failed to delete helper:', err);
          },
        });
      }
    });
  }
}

