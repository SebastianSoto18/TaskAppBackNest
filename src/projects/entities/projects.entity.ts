import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { IProject } from "../../interfaces/project.interface";
import { UsersProjectsEntity } from "../../users/entities/usersProjects.entity";
import { TaskEntity } from "../../tasks/entitites/tasks.entity";

@Entity({name: 'projects'})
export class ProjectsEntity extends BaseEntity implements IProject{
    @Column()
    name: string;
    @Column()
    description: string;
    @OneToMany(
        () => UsersProjectsEntity,
        (usersProjects) => usersProjects.project,
      )
      usersInclude: UsersProjectsEntity[];
    @OneToMany(() => TaskEntity, (task) => task.project)
    tasks: TaskEntity[];
}