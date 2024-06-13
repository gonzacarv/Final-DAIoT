import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'selection',
    loadChildren: () => import('./selection/selection.module').then(m => m.SelectionPageModule),
    canActivate: [AuthGuard] // Asegura que solo usuarios autenticados puedan acceder a la selección
  },
  {
    path: 'home', // aqui es donde estan los consumos
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard] // Asegura que solo usuarios autenticados puedan ver los consumos
  },
  {
    path: 'groups', 
    loadChildren: () => import('./groups/groups.module').then(m => m.GroupsPageModule),
    canActivate: [AuthGuard] // Asegura que solo usuarios autenticados puedan ver los grupos
  },
    {
    path: 'details', 
    loadChildren: () => import('./details/details.module').then(m => m.DetailsPageModule)
  },
  // Asegúrate de que la ruta de captura todo está al final
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
