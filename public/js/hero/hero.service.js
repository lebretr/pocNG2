'use strict';

import { Injectable } from '@angular/core';

import { HEROES } from 'scheduler/mock/mock-heroes';

class HeroService {
    constructor() {}

    getHeroes() {
        // return HEROES;
        return Promise.resolve(HEROES);
    }

    getHeroesSlowly(){
        return new Promise(
            resolve => setTimeout(resolve, 2000)// delay 2 seconds
        ).then(
            () => this.getHeroes()
        );
    }

    getHero(id) {
        return this.getHeroes()
                .then(heroes => heroes.find(hero => hero.id === id));
    }
}

Injectable(HeroService);

export { HeroService };


