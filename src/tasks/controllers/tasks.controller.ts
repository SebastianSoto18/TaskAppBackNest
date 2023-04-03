import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { TaskDto } from '../dto/task.dto';
import { TaskEntity } from '../entitites/tasks.entity';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AccessLevel } from 'src/auth/decorator/access-level.decorator';
import { ApiHeader, ApiTags } from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('tasks')
@UseGuards(AuthGuard, RolesGuard,AccessLevelGuard)
export class TasksController {
    constructor(private readonly taskService: TasksService) {}
    @ApiHeader({
        name: 'access_token',
    })
    @AccessLevel('DEVELOPER')
    @Post(':projectId')
    public async createTask(@Body() body: TaskDto,@Param('projectId') projectId: string): Promise<TaskEntity> {
        return await this.taskService.createTask(body, projectId);
    }

}
