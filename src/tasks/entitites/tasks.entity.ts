import { STATUS_TASK } from "../../constants/status-task";
import { BaseEntity } from "../../config/base.entity";
import { ProjectsEntity } from "../../projects/entities/projects.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";


@Entity({name: 'tasks'})
export class TaskEntity extends BaseEntity{
    @Column({nullable: false})
    taskName: string;
    @Column()
    taskDescription: string;
    @Column({nullable: false, type: 'enum', enum: STATUS_TASK})
    status: STATUS_TASK
    @Column()
    responsableName: string;
    @ManyToOne(() => ProjectsEntity, (project) => project.tasks)
    @JoinColumn({name: 'projectId'})
    project: ProjectsEntity
}