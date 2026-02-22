import { Component } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-helper-qr',
  standalone: true,
  imports: [CommonModule, QRCodeModule, MatIconModule],
  templateUrl: './helper-qr.component.html',
  styleUrl: './helper-qr.component.scss',
})
export class HelperQrComponent {
  qrData: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    // You can stringify or encode ID/name/email etc.
    const payload = {
      name: data.name,
      role: data.role,
    };

    this.qrData = JSON.stringify(payload);
  }
}
