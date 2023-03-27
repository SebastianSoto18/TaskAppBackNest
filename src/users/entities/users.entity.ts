import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { ROLES } from "../../constants/roles";
import { IUser } from "../../interfaces/user.interface";
import { UsersProjectsEntity } from "./usersProjects.entity";
import {Exclude} from 'class-transformer'

@Entity({name: 'users'})
export class UsersEntity extends BaseEntity implements IUser{
    @Column()
    firstName: string;
    @Column()
    lastName: string;
    @Column({unique:true})
    email: string;
    @Column({unique:true})
    username: string;
    @Exclude()
    @Column()
    password: string;
    @Column()
    age: number;
    @Column({type: 'enum', enum: ROLES, default: ROLES.BASIC}) 
    role: ROLES;
    @OneToMany(() => UsersProjectsEntity, (usersProjects) => usersProjects.user)
    projectsInclude: UsersProjectsEntity[];
}