import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { Delete, UseGuards } from "@nestjs/common/decorators";
import { AccessLevel } from "src/auth/decorator/access-level.decorator";
import { Roles } from "src/auth/decorator/roles.decorator";
import { AccessLevelGuard } from "src/auth/guards/access-level.guard";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { ProjectDto, UpdateProjectDto } from "../dto/project.dto";
import { ProjectsService } from "../services/projects.service";
import { ApiHeader, ApiTags } from "@nestjs/swagger";


@ApiTags('Projects')
@Controller('projects')
@UseGuards(AuthGuard,RolesGuard,AccessLevelGuard)
export class ProjectsController{
    constructor(private readonly projectsService: ProjectsService) { }

    @ApiHeader({
        name: 'access_token',
    })
    @Roles('CREATOR')
    @Post('project/userOwner/:id')
    public async CreateProject(@Body() body:ProjectDto, @Param('id') id: string): Promise<any> {
        return await this.projectsService.CreateProject(body, id);
    }
    @ApiHeader({
        name: 'access_token',
    })
    @Get('all')
    public async FindProjects(): Promise<any> {
        return await this.projectsService.FindProjects();
    }
    @ApiHeader({
        name: 'access_token',
    })
    @Get(':id')
    public async FindProjectById(@Param('id') id: string): Promise<any> {
        return await this.projectsService.FindProjectById(id);
    }
    @ApiHeader({
        name: 'access_token',
    })
    @Put(':id')
    @AccessLevel('OWNER')
    public async UpdateProject(@Param('id') id: string, @Body() body: UpdateProjectDto): Promise<any> {
        return await this.projectsService.UpdateProject(id, body);
    }
    @ApiHeader({
        name: 'access_token',
    })
    @Delete(':id')
    public async DeleteProject(@Param('id') id: string): Promise<any> {
        return await this.projectsService.DeleteProject(id);
    }
}