import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });

    this.authService.username$.subscribe(name => {
      this.username = name;
    });
  }

  logout() {
    this.authService.logout();
    window.location.href = '/login';
  }

  toggleDarkMode() {
    document.body.classList.toggle('dark-theme');
  }
}
