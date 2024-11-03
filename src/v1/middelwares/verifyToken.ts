import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const verifyToken = (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(401).send('Authentication required.');
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {

        if (err) {
            res.status(403).send('Invalid token.');
            return;
        }

        const jwtDecoded = <{ userId: string }>decoded

        req.user = jwtDecoded.userId

        next();
    });
};

export default verifyToken