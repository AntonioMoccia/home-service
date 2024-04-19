import express, { Application, NextFunction, Request, Response } from 'express'
import db from '@config/db'


db.then(() => {
    console.log('db connected');

    const app: Application = express()

    app.get('/', (req: Request, res: Response) => {
        res.send('hello world')
    })

    app.listen(5000, () => {
        console.log(`http://localhost:5000`);
    })
})


