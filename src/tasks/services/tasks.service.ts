import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from '../entitites/tasks.entity';
import { Repository } from 'typeorm';
import { ProjectsService } from 'src/projects/services/projects.service';
import { TaskDto } from '../dto/task.dto';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskEntity) private readonly taskRepository: Repository<TaskEntity>
        ,private readonly projectService: ProjectsService
        ) 
        {}

    public async createTask(body: TaskDto, projectId: string): Promise<TaskEntity> {
        try{
            const project = await this.projectService.FindProjectById(projectId);
            
            if(!project){
                throw new ErrorManager({
                    message: 'Project not found',
                    type: 'NOT_FOUND',
                });
            }
            
            return await this.taskRepository.save({...body, project});
        }catch(error){
            ErrorManager.createError(error.message);
        }
    }
}
