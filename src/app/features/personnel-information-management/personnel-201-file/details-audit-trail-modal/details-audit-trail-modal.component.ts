import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Personnel201File } from '../personnel-201.service';

@Component({
  selector: 'app-details-audit-trail-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details-audit-trail-modal.component.html',
  styleUrls: ['./details-audit-trail-modal.component.scss']
})
export class DetailsAuditTrailModalComponent {
  @Input() file: Personnel201File | null = null;
  @Output() close = new EventEmitter<void>();

  closing = false;

  onClose() {
    this.closing = true;
    setTimeout(() => {
      this.close.emit();
      this.closing = false;
    }, 400); // match animation duration
  }
} 