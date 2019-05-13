import { Component, OnInit } from '@angular/core';
import {ProviderService} from '../data/services/provider.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public login: any = '';
  public password: any = '';
  public logged = false;
  public token = '';

  constructor(private provider: ProviderService
  ) { }

  ngOnInit() {

    this.token = localStorage.getItem('token');
  }
  auth() {
    if (this.login !== '' && this.password !== '' && this.token !== '' ) {
      this.provider.auth(this.login, this.password).then(res => {
        console.log(res);
        localStorage.setItem('token', res.token);

        this.logged = true;
      });
    }
  }

  logout() {
    this.provider.logout().then(res => {
      localStorage.clear();
      this.logged = false;
    });
  }

}
