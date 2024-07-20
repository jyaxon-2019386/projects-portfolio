'use strict'

import jwt from "jsonwebtoken"
import User from '../src/user/user.model.js'

export const validateJwt = async (req, res, next) => {
    try {
        const secretKey = process.env.SECRET_KEY;
        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.status(401).send({ message: 'Unauthorized' });
        }

        const token = authorization.split(' ')[1]; // Obtener el token del encabezado
        const decoded = jwt.verify(token, secretKey);

        const user = await User.findById(decoded.uid);

        if (!user) {
            return res.status(404).send({ message: 'User not found - Unauthorized' });
        }

        req.user = user; // Guardar el usuario en la solicitud para que los siguientes middlewares/controladores lo puedan usar
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).send({ message: 'Invalid Token' });
    }
};

export const isAdmin = async (req, res, next) => {
    try {
        let { user } = req
        if (!user || user.role !== 'ADMIN') return res.status(403).send({ message: `You dont have access: ${user.username}` })
        next()
    } catch (err) {
        console.error(err)
        return res.status(403).send({ message: 'Unauthorized role' })
    }

}

export const isClient = async (req, res, next) => {
    try {
        let { user } = req
        if (!user || user.role !== 'CLIENT') return res.status(403).send({ message: `You dont have access: ${user.username}` })
        next()
    } catch (err) {
        console.error(err)
        return res.status(403).send({ message: 'Unauthorized role' })
    }

}