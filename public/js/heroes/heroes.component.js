'use strict';

import { Component/*, Inject*/ } from '@angular/core';
import { Router } from '@angular/router';

import { HeroService } from 'scheduler/hero/hero.service';

const HeroesComponent = Component({
    selector: 'my-heroes',
    templateUrl: 'js/heroes/heroes.component.html',
    styleUrls: ['js/heroes/heroes.component.css']
}).Class({
    constructor( heroService, router) {
        this.heroService=heroService;
        this.router=router;

        this.heroes = [];
        this.selectedHero=null;
    },

    ngOnInit() {
        this.getHeroes();
    },

    getHeroes() {
        this.heroService.getHeroes/*Slowly*/().then(heroes => this.heroes = heroes);
    },

    onSelect(hero){
        this.selectedHero = hero;
    },

    gotoDetail() {
        this.router.navigate(['/detail', this.selectedHero.id]);
    }
});

/**
 * Injection de service (methode 1).
 *
 * Dans le module, on met la classe du service
 * Ensuite il faut utiliser Reflect.defineMetadata pour mapper le service désiré et le parametre du constructeur de la classe Component
 */
Reflect.defineMetadata('design:paramtypes', [HeroService, Router], HeroesComponent);

/**
 * Injection de service (methode 2).
 *
 * Dans le module, on defini les provider sous forme d'objets clé/valeur (nommé dans angular2: provide/useValue).
 * Ensuite il faut utilser la fonction Inject pour mapper le service désiré et le parametre du constructeur de la classe Component
 */
// Inject('HeroService')(HeroesComponent, null, 0);
// Inject('Router')(HeroesComponent, null, 1);

export {HeroesComponent};

