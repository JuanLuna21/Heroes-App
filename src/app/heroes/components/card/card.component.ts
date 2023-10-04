import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/heroe.interface';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './card.component.html',
 
})
export class CardComponent implements OnInit{


  ngOnInit(): void {
    if (!this.hero) throw Error ('Hero Property is required');
  }

  @Input()
  public hero!:Hero;

}
