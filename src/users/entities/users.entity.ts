import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { ROLES } from "../../constants/roles";
import { IUser } from "../../interfaces/user.interface";
import { UsersProjectsEntity } from "./usersProjects.entity";

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
    @Column()
    password: string;
    @Column()
    age: number;
    @Column({type: 'enum', enum: ROLES, default: ROLES.BASIC}) 
    role: ROLES;
    @OneToMany(() => UsersProjectsEntity, (userProject) => userProject.user)
    projectsInclude: UsersProjectsEntity[];
}