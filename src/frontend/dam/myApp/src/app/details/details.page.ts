import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  detalle: any;
  loading: boolean = true; 

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        this.loadDetalle(id);
      } else {
        console.error('ID de consumo es nulo');
      }
    });
  }

  loadDetalle(id: string) {
    this.apiService.getDetalle(id).subscribe({
      next: (data) => {
        this.detalle = data;
        this.loading = false; 
      },
      error: (error) => {
        console.error('Error al cargar detalles:', error);
        this.loading = false; 
      }
    });
  }

  toggleEstado(id: any, estado: any) {
   
  }

  volverAHome() {
   
  }
}
