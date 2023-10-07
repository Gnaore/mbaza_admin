import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appInputFormat]'
})
export class InputFormatDirective {

  constructor(private el: ElementRef) { }

  @HostListener('blur')
  onBlur() {
    // changement du type du champ
    this.el.nativeElement.type = "text";
    // suppression des espaces
    const value: String = this.el.nativeElement.value.replaceAll(' ', '');
    let currencyFormatValue: String = '';

    // formatage de la chaine en montant
    // séparation et ajout d'espace quand la longueur de la chaîne est supérieure à 3
    if (value.length > 3) {
      let i: number = 1;
      for (let index = value.length - 1; index >= 0; index--) {
        // récupération de chaque chaine de la variable
        currencyFormatValue += value[index];

        // Ajout d'espace après avoir formé un groupe de 3 chaines
        if (i === 3) {
          i = 0;
          currencyFormatValue += ' ';
        }
        i++;
      }
      this.el.nativeElement.value = '';
      // renversement du contenu de la variable currencyFormatValue
      for (let index = currencyFormatValue.length - 1; index >= 0; index--) {
        this.el.nativeElement.value += currencyFormatValue[index];
      }
      this.el.nativeElement.value = this.el.nativeElement.value.trim();
    }
  }

  // suppression des espaces et changement du type du champ de saisie
  @HostListener('focus')
  onFocus() {
    this.el.nativeElement.value = this.el.nativeElement.value.replaceAll(' ', '');
    this.el.nativeElement.type = "number";
  }
}
