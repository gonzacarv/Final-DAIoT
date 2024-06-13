import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'; 
import { Router } from '@angular/router'; 
import { ModalController } from '@ionic/angular'; 
import { ScheduleModalComponent } from '../modals/schedule-modal/schedule-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  consumos: any[] = [];

  constructor(
    private apiService: ApiService, 
    private router: Router,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.loadConsumos();
  }

  loadConsumos() {
    this.apiService.getConsumos().subscribe({
      next: (data) => {
        this.consumos = data;
      },
      error: (error) => {
        console.error('Error al cargar consumos:', error);
      }
    });
  }

  toggleConsumo(id: number, estado: boolean) {
    this.apiService.updateConsumo(id, { estado }).subscribe({
      next: () => {
        this.loadConsumos(); 
      },
      error: (error) => {
        console.error('Error al actualizar consumo:', error);
      }
    });
  }

  navigateToDetails(id: number) {
    this.router.navigate(['/details', id]);
  }
  

  changeIntensidad(id: number, intensidad: number) {
    this.apiService.updateIntensidad(id, { intensidad }).subscribe({
      next: () => {
        this.loadConsumos();
      },
      error: (error) => {
        console.error('Error al actualizar intensidad:', error);
      }
    });
  }

  expandDetails(consumo: any) {
    consumo.expanded = !consumo.expanded;
  }
  
  async openScheduleModal(consumoId: number) {
    const modal = await this.modalController.create({
      component: ScheduleModalComponent,
      componentProps: { deviceId: consumoId }
    });
  
    // Presenta el modal
    await modal.present();
  
   
  const { data } = await modal.onDidDismiss();

  if (data) {
    console.log('Datos recibidos del modal:', data);  // Muestra los datos en la consola
    this.submitSchedule(consumoId, data.inicio, data.fin);
  } else {
    console.log('No se recibieron datos del modal');
  }
  }
  
  submitSchedule(consumoId: number, inicio: string, fin: string) {
    const schedule = { start: inicio, end: fin }; // Construye el objeto schedule
    console.log('Enviando al backend:', { consumoId, inicio, fin });  // Muestra los datos antes de enviar
  
    this.apiService.scheduleDevice(consumoId, schedule).subscribe({
      next: response => {
        console.log('Respuesta del backend:', response);
      },
      error: error => {
        console.error('Error al enviar al backend:', error);
      }
    });
  }
  
}
