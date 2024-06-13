import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ScheduleModalComponent } from './modals/schedule-modal/schedule-modal.component';

@NgModule({
  declarations: [ScheduleModalComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [ScheduleModalComponent]
})
export class ModalsModule {}
