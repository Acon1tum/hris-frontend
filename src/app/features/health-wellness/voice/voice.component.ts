import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-voice',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './voice.component.html',
  styleUrls: ['./voice.component.scss']
})
export class VoiceComponent {
  showUploadModal = false;
  showUploadCard = false;

  openModal() {
    console.log('openModal called');
    this.showUploadModal = true;
  }

  closeModal() {
    this.showUploadModal = false;
  }

  toggleUploadCard() {
    this.showUploadCard = !this.showUploadCard;
  }
} 