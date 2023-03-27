import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import * as bcryp from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UsersEntity } from 'src/users/entities/users.entity';
import { PayloadToken } from '../interfaces/auth.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService, 
    ) { }

    public async validateUser(username: string, pass: string): Promise<any> {
        const userByusername = await this.userService.FindBy({key:'username',value:username});
        const userByEmail = await this.userService.FindBy({key:'email',value:username});
        if(userByusername){
            const isMatch = await bcryp.compare(pass, userByusername.password);
            if(isMatch){
                return userByusername;
            }
        }
        if(userByEmail){
            const isMatch = await bcryp.compare(pass, userByEmail.password);
            if(isMatch){
                return userByEmail;
            }
        }
        return null;
    }

    public signJWT({payload,secret,expires}:{payload:jwt.JwtPayload; secret:string; expires:number | string;}){
        return jwt.sign(payload,secret,{expiresIn:expires});
    }
b
    public async generateJWT(user: UsersEntity): Promise<any> {
        const getUser = await this.userService.FindUserById(user.id);
        const payload: PayloadToken = {
            role: getUser.role,
            sub: getUser.id,
        };
        return {
            access_token: this.signJWT({payload,secret:process.env.JWT_SECRET,expires:'1h'}),
            user,
        }
    }
}

