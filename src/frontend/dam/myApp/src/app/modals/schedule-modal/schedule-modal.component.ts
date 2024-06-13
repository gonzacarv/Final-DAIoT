import { Component, OnInit } from '@angular/core';  // Importa OnInit
import { ModalController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-schedule-modal',
  templateUrl: './schedule-modal.component.html',
  styleUrls: ['./schedule-modal.component.scss'],
})
export class ScheduleModalComponent implements OnInit {  
  startTime: string = '';
  endTime: string = '';
  deviceId!: number;

  constructor(private modalCtrl: ModalController, private apiService: ApiService) {}

  ngOnInit() {
    if (this.deviceId === undefined) {
      throw new Error('Device ID is required for this component to function properly.');
    }
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

schedule() {
  const startTimeFormatted = this.formatTime(this.startTime);
  const endTimeFormatted = this.formatTime(this.endTime);

  this.apiService.scheduleDevice(this.deviceId, { start: startTimeFormatted, end: endTimeFormatted })
      .subscribe({
          next: (response) => {
              console.log('Programación exitosa', response);
              this.dismissModal();
          },
          error: (error) => {
              console.error('Error al programar el dispositivo:', error);
          }
      });
}

formatTime(dateTime: string): string {
  const time = new Date(dateTime);
  return time.toTimeString().substring(0, 8); 
}

}
