import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { ACCES_LEVEL } from "../../constants/roles";
import { UsersEntity } from "./users.entity";
import { ProjectsEntity } from "../../projects/entities/projects.entity";

@Entity({name: 'users_projects'})
export class UsersProjectsEntity extends BaseEntity{
    @Column({type: 'enum', enum: ACCES_LEVEL})
    acccesLevel: ACCES_LEVEL;

    @ManyToOne(()=> UsersEntity, (user)=> user.projectsInclude)
    user: UsersEntity;
    @ManyToOne(() => ProjectsEntity, (project)=> project.usersInclude)
    project: ProjectsEntity;
}