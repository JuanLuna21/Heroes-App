import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { HeroesService } from '../../services/heroes.service';
import { Hero, Publisher } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})

export class NewPageComponent  implements OnInit{

  public heroForm = new FormGroup ({
    

    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', {nonNullable: true}),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),

  })

  public publlisher = [
    {id: 'DC Comics', desc: 'Dc-Comics'},
    {id: 'Marvel Comics', desc: 'Marvel-Comics'},
  ]

  constructor(private heroesService: HeroesService, private activatedRoute: ActivatedRoute, private route: Router, private snackbar: MatSnackBar){}


  ngOnInit(): void {

    if( !this.route.url.includes('edit') ) return;

    this.activatedRoute.params.pipe(
      switchMap( ( { id }  )  => this.heroesService.getHeroById(id))
      ).subscribe(hero => {
        if ( !hero ) return  this.route.navigateByUrl('/');
        this.heroForm.reset(hero);
        return
      })

  }


  get currentHero(): Hero {

    const hero = this.heroForm.value as Hero;

    return hero;
    
  }

  onSubmit():void {

   if( this.heroForm.invalid) return;
    
    if ( this.currentHero.id ){
      this.heroesService.updateHero( this.currentHero )
        .subscribe ( hero => {
          this.showSnackBar(`${hero.superhero} updated!`);
        });
        return;
    } 

    this.heroesService.addHero(this.currentHero).subscribe(hero => {
      this.route.navigate(['/heroes/edit'])
      this.showSnackBar( `${hero.superhero} created!` );
    })

    }

    showSnackBar( message: string): void{
      this.snackbar.open(message, 'done', {
        duration: 2500,
      })
    }
}
