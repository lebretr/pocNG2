'use strict';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from 'scheduler/dashboard/dashboard.component';
import { HeroDetailComponent } from 'scheduler/hero/detail/hero-detail.component';
import { HeroesComponent } from 'scheduler/heroes/heroes.component';

const routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'detail/:id', component: HeroDetailComponent },
    { path: 'heroes', component: HeroesComponent }
];

const AppRoutingModule=NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
}).Class({
    constructor() {}
});

export { AppRoutingModule };
