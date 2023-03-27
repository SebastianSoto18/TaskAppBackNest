import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { ErrorManager } from 'src/utils/error.manager';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserDto, UserToProjectDto, UserUpdateDto } from '../dto/user.dto';
import { UsersEntity } from '../entities/users.entity';
import { UsersProjectsEntity } from '../entities/usersProjects.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UsersEntity) private readonly usersRepository: Repository<UsersEntity>,
    @InjectRepository(UsersProjectsEntity) private readonly userProjectsRepository: Repository<UsersProjectsEntity>) { 
    }

    public async CreateUser(body : UserDto): Promise<UsersEntity>{
        try{
            body.password = await bcrypt.hash(body.password, +process.env.HASH_SALT);;
            return await this.usersRepository.save(body);
        }catch(error){
            ErrorManager.createError(error.message);
        }
    }

    public async AddUserToProject(body : UserToProjectDto): Promise<any>{
        try{
            return await this.userProjectsRepository.save(body);
        }catch(error){
            ErrorManager.createError(error.message);
        }
    }

    public async FindUsers(): Promise<UsersEntity[]>{
        try{
             const users: UsersEntity[] =  await this.usersRepository.find();
             if(users.length == 0){
                 throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: 'No users found'
                 });
             }
             return users;
        }catch(error){
            ErrorManager.createError(error.message);
        }
    }

    public async FindBy({key,value}:{key:keyof UserDto;value:any}){
        try{
            const user: UsersEntity = await this.usersRepository.createQueryBuilder('user').where({[key]:value}).getOne();
            return user;
        }catch(error){
            ErrorManager.createError(error.message);
        }
    }

    public async FindUserById(id : string): Promise<UsersEntity>{
        try{
            const user: UsersEntity =  await this.usersRepository.createQueryBuilder('user').where({id}).
            leftJoinAndSelect('user.projectsInclude','projectsInclude').
            leftJoinAndSelect('projectsInclude.project','project').
            getOne();
            if(!user){
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: 'No user found'
                 });
            }
            return user;
        }catch(error){
            ErrorManager.createError(error.message);
        }
    }

    public async UpdateUser(id : string, body : UserUpdateDto): Promise<UpdateResult | undefined>{
        try{
            const user : UpdateResult = await this.usersRepository.update(id, body);
            if(user.affected == 0){
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: 'cannot update user'
                    });
            }
            return user;
        }catch(error){
            ErrorManager.createError(error.message);
        }
    }

    public async DeleteUser(id : string): Promise<DeleteResult| undefined>{
        try{
            const user : DeleteResult = await this.usersRepository.delete(id);
            if(user.affected == 0){
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: 'cannot delete user'
                    });
            }
            return user;
        }catch(error){
            ErrorManager.createError(error.message);
        }
    }
}
