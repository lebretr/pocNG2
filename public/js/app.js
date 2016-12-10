'use strict';

import 'reflect-metadata';
import 'zone.js';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from 'scheduler/app.module';

// document.addEventListener('DOMContentLoaded', function() {
enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);
// });
