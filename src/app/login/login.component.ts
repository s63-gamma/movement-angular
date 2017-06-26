import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public username = '';
  public password = '';

  public admins = ['gerbengerittsen', 'martijnvanbuul', 'rickrongen', 'guushamm', 'frankhartman'];

  constructor() { }

  ngOnInit() {
  }

}
