// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

import checkVatNumber from './checkVatNumber';
import { FirebaseToken, VatCheckRequest } from './types';
//import { AxiosError } from "axios";

admin.initializeApp(functions.config().firebase);

const app = express();

app.use(express.json());
app.use(cors({ origin: true }));

const validateToken = async (req: any, res: any, next: any) => {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader) {
			res.sendStatus(401);
		} else {
			// get berear token from auth header
			const token = authHeader.split(' ')[1];
			await admin.auth().verifyIdToken(token);
			next();
		}
	} catch (err) {
		res.sendStatus(401);
	}
};

app.post('/revokeTokens', validateToken, async (req, res) => {
	try {
		const authHeader = <string>req.headers.authorization;
		const token = authHeader.split(' ')[1];
		const decoded = <FirebaseToken>jwt.decode(token);
		await admin.auth().revokeRefreshTokens(decoded.user_id);
	} catch (ex) {
		res.status(400).send(ex);
	}
});

app.post('/checkVatNumber', async (req, res) => {
	const reqBody: VatCheckRequest = req.body;
	try {
		const data = await checkVatNumber(reqBody.country, reqBody.vatNumber);
		res.send(data);
	} catch (error) {
		res.status(error.status).send(error.data.message);
	}
});

export const api = functions.https.onRequest(app);
