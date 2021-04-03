import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdownBetter]'
})
export class DropdownDirectiveBetter {
  @HostBinding('class.open') isOpen = false;
  @HostListener('document:click',['$event'])  toggleOpen(event: Event){
    this.isOpen = this.elementRef.nativeElement.contains(event.target) ?true : false;

  }
  constructor(private  elementRef: ElementRef) {
  }
}
