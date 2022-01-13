import { Response, Request } from 'express';
import { verify } from 'jsonwebtoken';
import config from "../configuration/config";
import { getRepository, Repository, ObjectID } from 'typeorm';
import { User } from '../entity/User';

export default async (req: Request, res: Response, next: Function) => {

	const token = req.body.token || req.query.token || req.headers['x-token-access'];
	const publicRoutes = <Array<String>>config.publicRoutes;
	let isPublicRoute: boolean = false;

  	const ObjectId = require('mongodb').ObjectId;


	publicRoutes.forEach(url => {
		const isPublic = req.url.includes(url) || req.url.indexOf('storage') > -1;
		if (isPublic)
			isPublicRoute = true;
	});

	if (isPublicRoute)
		next();
	else
		if (token) {
			try {
				const _userAuth = verify(token, config.secretyKey);
				req.userAuth = _userAuth;
				const _userRepository: Repository<any> = getRepository(User);

				const _userDB = await _userRepository.findOne({ _id: ObjectId(_userAuth.uid) });

				req.IsRoot = _userDB.isRoot || false;
				next();
			} catch (error) {
				res.status(401).send({ message: 'Token informado é inválido' });
				return;
			}
		} else {
			res.status(401).send({ message: 'Para acessar esse recurso você precisa estar autenticado' });
			return;
		}

}
