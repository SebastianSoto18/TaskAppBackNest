import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { STATUS_TASK } from "src/constants/status-task";
import { ProjectDto } from "src/projects/dto/project.dto";

export class TaskDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    taskName: string;

    @ApiProperty()
    @IsString()
    taskDescription: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(STATUS_TASK)
    status: STATUS_TASK;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    responsableName: string;

    @ApiProperty()
    @IsOptional()
    project?:ProjectDto;
}
