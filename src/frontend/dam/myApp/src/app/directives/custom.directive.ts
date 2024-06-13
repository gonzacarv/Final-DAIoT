import { Directive, ElementRef, Input, Renderer2, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appCustomHighlight]'  // Selector que usarás para aplicar la directiva
})
export class CustomHighlightDirective implements OnChanges {
  @Input('appCustomHighlight') consumo!: any; // Cambio para aceptar el objeto completo

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['consumo'] && this.consumo) {
      // Acceso a la propiedad 'estado' usando notación de corchetes
      const color = this.consumo['estado'] ? '' : 'darkgreen';
      this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', color);
    }
  }
}
