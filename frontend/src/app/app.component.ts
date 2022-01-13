import { UserService } from './services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IMenu } from './interfaces/IMenu';
import { Router } from '@angular/router';

const belvoToken = localStorage.getItem('bankconnector:link');


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
	isLogged: boolean = false;
	subscrip: Subscription;

	menu: Array<IMenu> = new Array<IMenu>();

	constructor(private userService: UserService, private router: Router
		) {
	}

	ngOnDestroy() {
		this.subscrip.unsubscribe();
	}

	ngOnInit() {
		this.isLogged = this.userService.isStaticLogged;
		this.subscrip = this.userService.isLogged.subscribe(logged => {
			this.isLogged = logged;
		});

    if(!belvoToken)
      this.router.navigateByUrl('/home');
    else
      this.router.navigateByUrl('/accounts');


		this.menu.push({
			group: 'Profile',
			items: [
				{ icon: 'bookmark', label: 'Accounts', url: '/accounts' },
				{ icon: 'bookmark', label: ' Transactions', url: '/transactions' },
				{ icon: 'bookmark', label: 'Owners', url: '/owners' },
				{ icon: 'bookmark', label: 'Balances', url: '/balances' },
				{ icon: 'bookmark', label: 'Incomes', url: '/incomes' },
			]
		});

		/*this.menu.push({
			group: 'Pessoas',
			items: [
				{ icon: 'person', label: 'Profissionais', url: '/ServiceProviders' },
				{ icon: 'person_pin', label: ' Clientes', url: '/Customers' },
			]
		});

		this.menu.push({
			group: 'Segurança',
			items: [
				{ icon: 'security', label: 'Usuários', url: '/Users' }
			]
		});

		this.menu.push({
			group: 'Gerenciamento',
			items: [
				{ icon: 'format_list_bulleted', label: 'Pedidos', url: '/' },
				{ icon: 'format_list_bulleted', label: 'Sair', url: '/logout' }
			]
		});*/
	}

	logout() {
		localStorage.removeItem('bankconnector:token');
		localStorage.removeItem('bankconnector:user');
    window.location.reload();
		this.router.navigateByUrl('/login');

	}


	cleanData() {
		localStorage.removeItem('bankconnector:link');
    window.location.reload();
		this.router.navigateByUrl('/home');

	}
}
