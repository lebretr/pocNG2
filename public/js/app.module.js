'use strict';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
// import { RouterModule }   from '@angular/router';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Location } from '@angular/common';

import { AppComponent } from 'scheduler/app.component';
import { DashboardComponent } from 'scheduler/dashboard/dashboard.component';
import { HeroDetailComponent } from 'scheduler/hero/detail/hero-detail.component';
// import { Logger } from 'scheduler/logger.service';
import { HeroesComponent } from 'scheduler/heroes/heroes.component';
import { HeroService } from 'scheduler/hero/hero.service';
import { AppRoutingModule }     from './app-routing.module';

const AppModule = NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule
    ],

    /**
     * Injection de service (methode 1).
     *
     * Dans le module, on met la classe du service
     * Ensuite il faut utiliser Reflect.defineMetadata pour mapper le service désiré et le parametre du constructeur de la classe Component
     */
    providers:    [
        HeroService
         /*, Logger*/
    ],
    /**
     * Injection de service (methode 2).
     *
     * Dans le module, on defini les provider sous forme d'objets clé/valeur (nommé dans angular2: provide/useValue).
     * Ensuite il faut utilser la fonction Inject pour mapper le service désiré et le parametre du constructeur de la classe Component
     */
    // providers:    [ { provide: 'HeroService', useValue: new HeroService() } ],
    // OU
    // providers:    [ { provide: 'HeroService', useClass: HeroService } ],

    declarations: [
        AppComponent,
        DashboardComponent,
        HeroDetailComponent,
        HeroesComponent
    ],
    // exports:      [ AppComponent ],
    bootstrap:    [ AppComponent ]
}).Class({
    constructor() {}
});

export { AppModule };
