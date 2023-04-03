import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ACCES_LEVEL } from 'src/constants/roles';
import { UsersProjectsEntity } from 'src/users/entities/usersProjects.entity';
import { UsersService } from 'src/users/services/users.service';
import { ErrorManager } from 'src/utils/error.manager';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProjectDto, UpdateProjectDto } from "../dto/project.dto";
import { ProjectsEntity } from "../entities/projects.entity";

@Injectable()
export class ProjectsService{
    constructor(@InjectRepository(ProjectsEntity) private readonly projectsRepository: Repository<ProjectsEntity>,
    @InjectRepository(UsersProjectsEntity) private readonly userProjectsRepository: Repository<UsersProjectsEntity>,
    private readonly userService: UsersService) { 
    }

    public async CreateProject (body : ProjectDto, id:string): Promise<any>{
        try{
            const user = await this.userService.FindUserById(id);
            const project = await this.projectsRepository.save(body)
            return await this.userProjectsRepository.save({
                acccesLevel: ACCES_LEVEL.OWNER,
                user: user,
                project: project
            }
            )
        }catch(error){
            throw ErrorManager.createError(error.message);
        }
    }

    public async FindProjects(): Promise<ProjectsEntity[]>{
        try{
            const projects: ProjectsEntity[] = await this.projectsRepository.find();
            if(projects.length == 0){
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: 'No projects found'
                });
            }
            return projects;
        }catch(error){
            ErrorManager.createError(error.message);
        }
    }

    public async FindProjectById(id : string): Promise<ProjectsEntity>{
        try{
            const project: ProjectsEntity =  await this.projectsRepository.
            createQueryBuilder('projects').where({id}).
            leftJoinAndSelect('projects.usersInclude','usersInclude')
            .leftJoinAndSelect('usersInclude.user', 'user').getOne();
            if(!project){
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: 'No project found'
                });
            }
            return project;
        }catch(error){
            ErrorManager.createError(error.message);
        }
    }

    public async UpdateProject(id : string, body : UpdateProjectDto): Promise<UpdateResult | undefined>{
        try{
            const project : UpdateResult = await this.projectsRepository.update(id, body);
            if(project.affected == 0){
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: 'cannot update project'
                });
            }
            return project;
        }catch(error){
            ErrorManager.createError(error.message);
        }
    }

    public async DeleteProject(id : string): Promise<DeleteResult| undefined>{
        try{
            const project : DeleteResult = await this.projectsRepository.delete(id);
            if(project.affected == 0){
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: 'cannot delete project'
                });
            }
            return project;
        }catch(error){
            ErrorManager.createError(error.message);
        }
    }
}