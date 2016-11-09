import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';

import './main.less';

if (process.env.ENV === 'production') {
    enableProdMode();
}

let __svg__ = {
    path: './assets/icons/*.svg',
    name: 'assets/icons/icons.svg'
};

require('webpack-svgstore-plugin/src/helpers/svgxhr')(__svg__);

platformBrowserDynamic().bootstrapModule(AppModule);
