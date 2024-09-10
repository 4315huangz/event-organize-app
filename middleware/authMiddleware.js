import {BadRequestError, UnauthenticatedError, UnauthorizedError} from '../errors/customErrors.js';
import { verifyJWT } from '../utils/jwtUtils.js';
 
export const authenticateUser = (req, res, next) => {
    const {token} = req.cookies;
    if(!token) throw new UnauthenticatedError ('authentication invalid');

    try {
        const {userId, role} = verifyJWT(token);
        const testUser = userId === '66e07382391d2e55aef994db';
        req.user = {userId, role, testUser};
        next();
    } catch (error) {
        throw new UnauthenticatedError('authentication invalid');
    }
}

export const authorizePermissions = (...roles) => {
   return (req, res, next) => {
    if(!roles.includes(req.user.role)){
        throw new UnauthorizedError('Unauthorized to access this resource.');
    }
    next();
   }
}

export const checkForTestUser = (req, res, next) => {
    if(req.user.testUser)
        throw new BadRequestError("Demo user, read only");
    next();
}