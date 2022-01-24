import { Request, Response } from 'express';
import { User } from "../entity/User";
import { BaseController } from "./BaseController";
import { sign } from 'jsonwebtoken';
import config from "../configuration/config";
import * as md5 from 'md5';
import { FileHelper } from '../helpers/fileHelper';
const axios = require('axios');



import Client from 'belvo';
import { json } from 'stream/consumers';

const client = new Client(
	config.belvoAuth.token,
	config.belvoAuth.secret,
	config.belvoAuth.env
	);

export class UserController extends BaseController<User> {

	constructor() {
		super(User);
	}

	async auth(request: Request) {

		let { email, password } = request.body;

		let pwd = request.body.password
		if (!email || !password)
			return { status: 400, message: 'Informe o email e a senha para efetuar o login' };

		let user = await this.repository.findOne({ email: email, password: md5(password) });


		if (user) {
			let createRefreshToken = await this.checkIfUserExists(request, user, pwd)

			let _payload = {
				uid: user.uid,
				name: user.name,
				photo: user.photo,
				email: user.email,
				rocketToken: createRefreshToken.data.authToken
			}
			return {
				status: 200,
				message: {
					user: _payload,
					token: sign({
						..._payload,
						tm: new Date().getTime()
					}, config.secretyKey)
				}
			}
		} else
			return { status: 404, message: 'E-mail ou senha inválidos' }
	}

	async checkIfUserExists(request: Request, user, pwd) {

		let username =  user.name.toLowerCase().split(" ")
		let sanitizedUserName = username[0] + "." + username[username.length -1]
	
		try {
			let data =  {
				email: user.email,
				name: user.name,
				password: pwd,
				username: sanitizedUserName
			  }		  
			let result = await axios.post(`${config.rocketAuth.serverUri}/api/v1/users.create`, data, {
			  headers: {
				'X-Auth-Token': config.rocketAuth.token,
				'X-User-Id': config.rocketAuth.userId,
				'Content-type': 'application/json'
			  }
			})		  
			if(result.status === 200){
				return this.createRefreshToken(request, result.data.user.username)
			}
  
  
		  }
		  catch (err) {
			console.log('err', err.response.status);
			if(err.response.status === 400){
				return this.createRefreshToken(request, sanitizedUserName)
			}

		  }

	}

	async createRefreshToken(request: Request, user) {	
		try {
			let data =  {
				username: user
			  }		  
			let result = await axios.post(`${config.rocketAuth.serverUri}/api/v1/users.createToken`, data, {
			  headers: {
				'X-Auth-Token': config.rocketAuth.token,
				'X-User-Id': config.rocketAuth.userId,
				'Content-type': 'application/json'
			  }
			})

			if(result.status === 200){
				return result.data				
			}  
		  }
		  catch (err) {
			console.log('err', err);
		  }


	}

	
	async getToken(request: Request) {

		return client.connect()
		.then(function () {
			return client.widgetToken.create()
            .then(function (response) {
                return(response);
            })
            .catch(function (error) {
                console.error(error)
            });
		})
	}

	async createUser(request: Request) {
		let { name, photo, email, password, confirmPassword, isRoot } = request.body;
		super.isRequired(name, 'Informe o nome');
		super.isRequired(photo, 'Informe a foto');
		super.isRequired(email, 'Informe o e-mail');
		super.isRequired(password, 'Informe a senha');
		super.isRequired(confirmPassword, 'Informe a confirmação da senha');

		let _user = new User();
		_user.name = name;
		_user.photo = photo;
		_user.email = email;
		_user.active = true
		_user.deleted = false

		let checkEmail = await this.repository.findOne({ email: email });
		if (checkEmail)
			return { status: 400, errors: ['Já existe um cadastro com esse email.'] }

		if (_user.photo) {
			let pictureCreatedResult = await FileHelper.writePicture(_user.photo)
			if (pictureCreatedResult)
				_user.photo = pictureCreatedResult
		}

		if (password != confirmPassword)
			return { status: 400, errors: ['A senha e a confirmação são diferente'] }

		if (password)
			_user.password = md5(password);

		if(!isRoot)
			_user.isRoot = false;

		return super.save(_user, request, true);
	}

	async save(request: Request) {
		let _user = <User>request.body;
		super.isRequired(_user.name, 'O nome do usuário é obrigatório');
		super.isRequired(_user.photo, 'A foto do usuário é obrigatória');

		_user.active = true
		_user.deleted = false


		if (_user.photo) {
			let pictureCreatedResult = await FileHelper.writePicture(_user.photo)
			if (pictureCreatedResult)
				_user.photo = pictureCreatedResult
		}

		return super.save(_user, request);
	}

}
