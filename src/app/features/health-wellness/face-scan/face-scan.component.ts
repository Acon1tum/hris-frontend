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
  isScanning = false;
  cameraOpen = false;

  async openCamera() {
    this.scanResult = null;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (this.videoElement && this.videoElement.nativeElement) {
        this.videoElement.nativeElement.srcObject = stream;
      }
      this.cameraOpen = true;
    } catch (err) {
      this.scanResult = 'Camera access denied or not available.';
      this.cameraOpen = false;
    }
  }

  async startFaceScan() {
    this.scanResult = null;
    this.isScanning = true;
    setTimeout(() => {
      this.isScanning = false;
      this.scanResult = 'Face detected!';
    }, 2000);
  }
} 