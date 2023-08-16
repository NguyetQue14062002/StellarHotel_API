import jwt from 'jsonwebtoken';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import Exception from '../exceptions/Exception.js';
import { printDebug, OutputTypeDebug } from '../helpers/printDebug.js';

export default function checkToken(req, res, next) {
    const bypassUrl = ['/auth/login', '/auth/register'];
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

    if (!token) {
        printDebug('Token không hợp lệ!', OutputTypeDebug.INFORMATION);
        res.status(HttpStatusCode.UNAUTHORIZED);
        throw new Exception(Exception.USER_NOT_AUTHORIZED_OR_TOKEN_MISSING);
    }

    jwt.verify(token, process.env.JWT_SECRET_ACCESS, (err, decoded) => {
        if (err || !decoded.user) {
            printDebug('Xác thực token không thành công!', OutputTypeDebug.INFORMATION);
            res.status(HttpStatusCode.UNAUTHORIZED);
            throw new Exception(Exception.USER_NOT_AUTHORIZED_OR_TOKEN_MISSING);
        }

        let role = decoded.user.role;
        // Ủy quyền

        req.userId = decoded.user.userId;
        next();
    });
}
