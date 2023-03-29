import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from '../../users/services/users.service';
import { PUBLIC_KEY } from 'src/constants/key-decorators';
import { Request } from 'express';
import { userToken } from 'src/utils/use.token';
import { IUseToken } from '../interfaces/auth.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userServices: UsersService,
    private readonly reflector: Reflector,
  ){}
  async canActivate(
    context: ExecutionContext,
  ){
    const isPublic = this.reflector.get<boolean>(PUBLIC_KEY, context.getHandler());
    if(isPublic)return true;
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers['access_token']
    if(!token || Array.isArray(token)){
      throw new UnauthorizedException('Invalid token');
    }
    const managToken: IUseToken | string = userToken(token)

    if(typeof managToken === 'string'){
      throw new UnauthorizedException(managToken);
    }

    if(managToken.isExpired){
      throw new UnauthorizedException('Token expired');
    }

    const {sub} = managToken
    const user = await this.userServices.FindUserById(sub);
    if(!user){
      throw new UnauthorizedException('invalid user');
    }
    request.idUser= user.id;
    request.roleUser = user.role;
    return true
  }
}
