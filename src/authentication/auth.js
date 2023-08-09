import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import jwt from 'jsonwebtoken';

export default function checkToken(req, res, next) {
    const bypassUrl = ['/user/login', '/user/register'];

    // bypass login, rigister
    if (
        bypassUrl
            .map((elementCurrent) => {
                return elementCurrent.toLowerCase().trim();
            })
            .includes(req.url.toLowerCase().trim())
    ) {
        next();
        return;
    }

    // other request
    // get and validate token
    const token = req.headers?.authorization?.split(' ')[1];
    try {
        const jwtObject = jwt.verify(token, process.env.JWT_SECRET);
        const isExpires = Date.now() >= jwtObject.exp * 1000;

        if (isExpires) {
            res.status(HttpStatusCode.BAD_REQUEST).json({
                message: 'Token is expired',
            });
        } else {
            next();
        }
    } catch (exception) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: `${exception.message}`,
        });
    }
}
