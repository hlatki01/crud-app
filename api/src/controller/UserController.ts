import { Request, Response } from 'express';
import { User } from "../entity/User";
import { BaseController } from "./BaseController";
import { sign } from 'jsonwebtoken';
import config from "../configuration/config";
import * as md5 from 'md5';
import { FileHelper } from '../helpers/fileHelper';

import Client from 'belvo';
import { json } from 'stream/consumers';

const client = new Client(
	'3a4c7f33-e91f-49c2-917d-cfafd1723963',
	'KtwR#K9aZ08wh-LC*xyL#WwgACXmC*COw2DUuvf@z-smRrARiDu4t1RkdFkauDnq',
	'sandbox'
	);




export class UserController extends BaseController<User> {

	constructor() {
		super(User);
	}

	async auth(request: Request) {

		let { email, password } = request.body;
		if (!email || !password)
			return { status: 400, message: 'Informe o email e a senha para efetuar o login' };

		let user = await this.repository.findOne({ email: email, password: md5(password) });
		console.log(user)
		if (user) {
			let _payload = {
				uid: user.uid,
				name: user.name,
				photo: user.photo,
				email: user.email,
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

		if (_user.photo) {
			let pictureCreatedResult = await FileHelper.writePicture(_user.photo)
			if (pictureCreatedResult)
				_user.photo = pictureCreatedResult
		}

		return super.save(_user, request);
	}

}
