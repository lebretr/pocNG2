import { Component } from '@angular/core';

import { HeroService } from 'scheduler/hero/hero.service';

const DashboardComponent=Component({
    // moduleId: module.id,
    selector: 'my-dashboard',
    templateUrl: 'js/dashboard/dashboard.component.html',
    styleUrls: [ 'js/dashboard/dashboard.component.css' ]
}).Class({
    constructor(heroService) {
        this.heroes=[];
        this.heroService=heroService;
    },

    ngOnInit() {
        this.heroService.getHeroes()
        .then(heroes => this.heroes = heroes.slice(1, 5));
    }
});

/**
 * Injection de service (methode 1).
 *
 * Dans le module, on met la classe du service
 * Ensuite il faut utiliser Reflect.defineMetadata pour mapper le service désiré et le parametre du constructeur de la classe Component
 */
Reflect.defineMetadata('design:paramtypes', [HeroService], DashboardComponent);

export { DashboardComponent };
