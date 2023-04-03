import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { ACCES_LEVEL_KEY, ADMIN_KEY, PUBLIC_KEY, ROLES_KEY } from 'src/constants/key-decorators';
import { ACCES_LEVEL, ROLES } from 'src/constants/roles';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AccessLevelGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UsersService
  ){}
  async canActivate(
    context: ExecutionContext,
  ){
    const isPublic = this.reflector.get<boolean>(PUBLIC_KEY, context.getHandler());
    if(isPublic)return true;

    const roles = this.reflector.get<Array<keyof typeof ROLES>>(ROLES_KEY, context.getHandler());
    const admin = this.reflector.get<string>(ADMIN_KEY, context.getHandler());
    const access_level = this.reflector.get<number>(ACCES_LEVEL_KEY, context.getHandler());
    const request = context.switchToHttp().getRequest<Request>();
    const {roleUser, idUser} = request

    if(access_level === undefined){
      if(roles===undefined){
        if(!admin){
          return true
        }else if(admin && roleUser === ROLES.ADMIN){
          return true
        }else{
          throw new UnauthorizedException('Invalid role');
        }
      }
    }

    if(roleUser === ROLES.ADMIN || roleUser == ROLES.CREATOR )return true;

    const user = await this.userService.FindUserById(idUser);

    const userExistInProject = user.projectsInclude.find((project) => project.project.id === request.params.id);

    if(!userExistInProject)throw new UnauthorizedException('you are not in this project');
    
    if(ACCES_LEVEL[access_level] > ACCES_LEVEL[userExistInProject.acccesLevel]){
      throw new UnauthorizedException('you are not authorized to this project')
    }
    
    
    
    return true;
  }
}
