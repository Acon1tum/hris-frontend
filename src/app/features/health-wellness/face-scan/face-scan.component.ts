import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-face-scan',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './face-scan.component.html',
  styleUrls: ['./face-scan.component.scss']
})
export class FaceScanComponent {
  @ViewChild('videoElement', { static: false }) videoElement!: ElementRef<HTMLVideoElement>;
  scanResult: string | null = null;

  async startFaceScan() {
    this.scanResult = null;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (this.videoElement && this.videoElement.nativeElement) {
        this.videoElement.nativeElement.srcObject = stream;
      }
      // Placeholder: In a real app, add face detection logic here
      this.scanResult = 'Face scan started (demo)';
    } catch (err) {
      this.scanResult = 'Camera access denied or not available.';
    }
  }
} 