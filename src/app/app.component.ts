import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'm-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
    providers: [
        Title
    ]
})

export class AppComponent implements OnInit {
    constructor(private titleService: Title) {}

    public setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle);
    }

    ngOnInit() {
        this.titleService.setTitle('Обзор');
    }
}