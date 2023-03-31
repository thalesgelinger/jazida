import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { z } from "zod";

admin.initializeApp(functions.config().firebase);


export const adminSignIn = functions.https.onRequest((req, res) => {

    const Admin = z.object({
        name: z.string(),
        password: z.string(),
    })

    try {
        Admin.parse(req.body)
    } catch (error) {
        res.status(500).send({
            message: error
        })
        return
    }


    const admin = {
        name: 'admin',
        password: 'admin',
    }


    const name = req.body.name
    const password = req.body.password

    const matchCredentials = name === admin.name && password === admin.password


    if (!matchCredentials) {
        res.status(500).send({
            message: 'Nome ou senha errados'
        })
        return
    }


    res.status(200).send({
        logged: true
    })
})

export const sendLoad = functions.https.onRequest(async (req, res) => {

    const Load = z.object({
        client: z.string(),
        plate: z.string(),
        material: z.string(),
        quantity: z.string(),
        paymentMethod: z.string(),
        signature: z.string()
    })

    const db = admin.firestore();

    try {
        const load = Load.parse(req.body)
        await db.collection('Loads').add(load)
    } catch (error) {
        res.status(500).send({
            message: error
        })
        return;
    } finally {
        res.status(200).end()
    }

})

export const getLoads = functions.https.onRequest(async (req, res) => {

    const db = admin.firestore();

    const loadsCollection = await db.collection('Loads').get()

    const loads = loadsCollection.docs.map(load => load.data())

    res.status(200).send(loads)
})


