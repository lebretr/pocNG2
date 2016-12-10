'use strict';

import { Component } from '@angular/core';

const TITLE='Tour of Heroes';

const AppComponent = Component({
    selector: 'my-app',
    template: `
        <h1>{{title}}</h1>
        <nav>
            <a routerLink="/dashboard">Dashboard</a>
            <a routerLink="/heroes">Heroes</a>
        </nav>
        <router-outlet></router-outlet>
    `,
    styleUrls: ['js/app.component.css']
}).Class({
    constructor() {
        this.title= TITLE;
    }
});

export {AppComponent};

