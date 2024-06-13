import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DetailsPage } from './details.page';
import { DetailsPageRoutingModule } from './details-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsPageRoutingModule  
  ],
  declarations: [DetailsPage]
})
export class DetailsPageModule {}
