'use strict';

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from 'scheduler/hero/hero.service';

const HeroDetailComponent = Component({
    // moduleId: module.id,
    selector: 'my-hero-detail',
    templateUrl: 'js/hero/detail/hero-detail.component.html',
    styleUrls: [ 'js/hero/detail/hero-detail.component.css' ]
}).Class({
    constructor(heroService, route, location) {
        this.hero= null;
        this.heroService= heroService;
        this.route= route;
        this.location= location;
    },

    ngOnInit() {
        this.route.params.forEach((params) => {
            let id = +params['id'];
            this.heroService.getHero(id)
            .then(hero => this.hero = hero);
        });
    },

    goBack() {
        this.location.back();
    }
});

/**
 * Injection de service (methode 1).
 *
 * Dans le module, on met la classe du service
 * Ensuite il faut utiliser Reflect.defineMetadata pour mapper le service désiré et le parametre du constructeur de la classe Component
 */
Reflect.defineMetadata('design:paramtypes', [HeroService, ActivatedRoute, Location], HeroDetailComponent);

export {HeroDetailComponent};
