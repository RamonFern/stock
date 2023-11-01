import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

    name!: string;


    constructor() {}

    ngOnInit(): void {
       // this.currentUser = JSON.parse(window.localStorage.getItem('currentUser')!)
    }

    capturarEvento(acao: any) {
        console.log(acao);
    }

    teste() {
        console.log(this.name);
    }
}
