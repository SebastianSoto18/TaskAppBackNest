import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserDto, UserUpdateDto } from '../dto/user.dto';
import { UsersEntity } from '../entities/users.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UsersEntity) private readonly usersRepository: Repository<UsersEntity>) { 
        
    }

    public async CreateUser(body : UserDto): Promise<UsersEntity>{
        try{
            return await this.usersRepository.save(body);
        }catch(error){
            console.log(error);
        }
    }

    public async FindUsers(body : UserDto): Promise<UsersEntity[]>{
        try{
             return await this.usersRepository.find();
        }catch(error){
            console.log(error);
        }
    }

    public async FindUserById(id : string): Promise<UsersEntity>{
        try{
            return await this.usersRepository.createQueryBuilder('users').where({id}).getOne();
        }catch(error){
            console.log(error);
        }
    }

    public async UpdateUser(id : string, body : UserUpdateDto): Promise<UpdateResult | undefined>{
        try{
            const user : UpdateResult = await this.usersRepository.update(id, body);
            if(user.affected == 0){
                return undefined;
            }
            return user;
        }catch(error){
            console.log(error);
        }
    }

    public async DeleteUser(id : string): Promise<DeleteResult| undefined>{
        try{
            const user : DeleteResult = await this.usersRepository.delete(id);
            if(user.affected == 0){
                return undefined;
            }
            return user;
        }catch(error){
            console.log(error);
        }
    }
}
