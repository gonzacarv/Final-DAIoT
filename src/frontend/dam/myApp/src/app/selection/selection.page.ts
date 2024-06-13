import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-selection',
    templateUrl: './selection.page.html',
    styleUrls: ['./selection.page.scss'],
})
export class SelectionPage implements OnInit {
    public username: string | null = null;  

    constructor(private router: Router) {}

    ngOnInit() {
        this.username = localStorage.getItem('username');
    }

    navigateTo(path: string) {
        this.router.navigate([path]);
    }
    logout() {
        localStorage.clear(); 
        this.router.navigate(['/login']); 
      }
}
