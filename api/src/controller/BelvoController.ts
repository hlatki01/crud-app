import { Response, Request } from 'express';
import Client from 'belvo';
import config from '../configuration/config';


const client = new Client(
	config.belvoAuth.token,
	config.belvoAuth.secret,
	config.belvoAuth.env
	);

export class BelvoController {

  async accounts (request: Request, response: Response) {
    console.log('request', request.body);
    
    const { id: link } = request.params;    
		return client.connect()
		.then(function () {
			return client.accounts.retrieve(link)
            .then(function (response) {
                return(response);
            })
            .catch(function (error) {
                console.error(error)
            });
		})
  }

  async transactions (request: Request, response: Response) {
    const { id: link, datestart: dateStart, dateend: dateEnd  } = request.params;    
    
		return client.connect()
		.then(function () {
			return client.transactions.retrieve(link, dateStart, { 'date_to': dateEnd })
            .then(function (response) {
                return(response);
            })
            .catch(function (error) {
                console.error(error)
            });
		})
  }

  async owners (request: Request, response: Response) {
    const { id: link } = request.params;    
		return client.connect()
		.then(function () {
			return client.owners.retrieve(link)
            .then(function (response) {
                return(response);
            })
            .catch(function (error) {
                console.error(error)
            });
		})
  }


  async balances (request: Request, response: Response) {
    const { id: link, datestart: dateStart, dateend: dateEnd  } = request.params;    
  
		return client.connect()
		.then(function () {
			return client.balances.retrieve(link, dateStart, {'date_to': dateEnd})
            .then(function (response) {
                return(response);
            })
            .catch(function (error) {
                console.error(error)
            });
		})
  }


  async incomes (request: Request, response: Response) {
    const { id: link } = request.params;    
		return client.connect()
		.then(function () {
			return client.incomes.retrieve(link)
            .then(function (response) {
                return(response);
            })
            .catch(function (error) {
                console.error(error)
            });
		})
  }


}