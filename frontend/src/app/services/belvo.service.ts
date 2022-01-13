import { HttpService } from './http.service';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
const xAuthToken = localStorage.getItem('bankconnector:token');



@Injectable({
	providedIn: 'root'
})
export class BelvoService {

	constructor() { }

	getAllAccounts(link: string) {
		return fetch(`http://localhost:21075/belvo/${link}/accounts`, {
			method: 'POST',
			headers: {
				'x-token-access': xAuthToken
			}
	})
	.then(response => response.json())
	.then((data) => data)
	.catch(error => console.error('Error:', error))
  }


	getTransactions(link: string, dateStart, dateEnd) {
		return fetch(`http://localhost:21075/belvo/${link}/transactions/${dateStart}/${dateEnd}`, {
			method: 'POST',
			headers: {
				'x-token-access': xAuthToken
			}
	})
	.then(response => response.json())
	.then((data) => data)
	.catch(error => console.error('Error:', error))
	}

	getAllOwners(link: string) {
		return fetch(`http://localhost:21075/belvo/${link}/owners`, {
			method: 'POST',
			headers: {
				'x-token-access': xAuthToken
			},


	})
	.then(response => response.json())
	.then((data) => data)
	.catch(error => console.error('Error:', error))
	}

	getAllBalances(link: string, dateStart, dateEnd) {
    console.log(dateStart, dateEnd);

		return fetch(`http://localhost:21075/belvo/${link}/balances/${dateStart}/${dateEnd}`, {
			method: 'POST',
			headers: {
				'x-token-access': xAuthToken
			}

	})
	.then(response => response.json())
	.then((data) => data)
	.catch(error => console.error('Error:', error))
	}

	getAllIncomes(link: string) {
		return fetch(`http://localhost:21075/belvo/${link}/incomes`, {
			method: 'POST',
			headers: {
				'x-token-access': xAuthToken
			}
	})
	.then(response => response.json())
	.then((data) => data)
	.catch(error => console.error('Error:', error))
	}

}
