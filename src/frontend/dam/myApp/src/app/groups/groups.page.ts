import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'; 
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
})
export class GroupsPage implements OnInit {
  grupos: any[] = [];  // Considera definir una interfaz para los grupos

  constructor(private apiService: ApiService, private router: Router) { } 

  ngOnInit() {
    this.loadGrupos();
  }

  loadGrupos() {
    this.apiService.getGrupos().subscribe({
      next: (data: any[]) => {  // Cambiado a any[] para evitar confusiones hasta que definas una interfaz
        this.grupos = data.map(grupo => ({
          ...grupo,
          expanded: false  // Asegura que expanded está inicializado
        }));
      },
      error: (error) => {
        console.error('Error al cargar grupos:', error);
      }
    });
  }

  expandDetails(grupo: any) {  // Cambiado de 'consumo' a 'grupo'
    grupo.expanded = !grupo.expanded;
  }
}
