import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-added-dialog',
  standalone: true,
  imports: [MatIconModule , CommonModule],
  templateUrl: './added-dialog.component.html',
  styleUrl: './added-dialog.component.scss'
})
export class AddedDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: { name: string }) {}
}
