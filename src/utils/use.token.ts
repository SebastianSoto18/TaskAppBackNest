import { AuthTokenResult, IUseToken } from "src/auth/interfaces/auth.interface";
import * as jwt from 'jsonwebtoken';

export const userToken = (token:string): IUseToken | string => {
    try{
        const decode = jwt.decode(token) as AuthTokenResult;
        const currentDateTime = new Date();
        const tokenExpireDate = new Date(decode.exp);
        return {
            sub: decode.sub,
            role: decode.role,
            isExpired: +tokenExpireDate < (+currentDateTime/1000)
        }

    }catch(err){
        return 'Invalid token'
    }
}
    