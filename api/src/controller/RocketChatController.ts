import { Response, Request } from 'express';
import config from '../configuration/config';

const axios = require('axios');


export class RocketChatController {

	async checkIfUserExists(request: Request) { 
    try {
      let data = [
        {
          email: "",
          name: "",
          password: "",
          
        }
      ]
      let result = await axios.get(`${config.rocketAuth.serverUri}/api/v1/users.list`, {
        headers: {
          'X-Auth-Token': config.rocketAuth.token,
          'X-User-Id': config.rocketAuth.userId
        }
      })

      //const objFound = result.data.users.find(obj => obj.email === request.userAuth.email);
      const objFound = result.data.users.find(obj => obj.emails.some(data => data.address === request.userAuth.email));

      
    }
    catch (err) {
      console.error(err);
    }
	}
}