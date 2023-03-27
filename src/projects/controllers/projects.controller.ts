import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { Delete } from "@nestjs/common/decorators";
import { ProjectDto, UpdateProjectDto } from "../dto/project.dto";
import { ProjectsService } from "../services/projects.service";



@Controller('projects')
export class ProjectsController{
    constructor(private readonly projectsService: ProjectsService) { }

    @Post('project')
    public async CreateProject(@Body() body:ProjectDto): Promise<any> {
        return await this.projectsService.CreateProject(body);
    }

    @Get('all')
    public async FindProjects(): Promise<any> {
        return await this.projectsService.FindProjects();
    }

    @Get(':id')
    public async FindProjectById(@Param('id') id: string): Promise<any> {
        return await this.projectsService.FindProjectById(id);
    }

    @Put(':id')
    public async UpdateProject(@Param('id') id: string, @Body() body: UpdateProjectDto): Promise<any> {
        return await this.projectsService.UpdateProject(id, body);
    }

    @Delete(':id')
    public async DeleteProject(@Param('id') id: string): Promise<any> {
        return await this.projectsService.DeleteProject(id);
    }
}