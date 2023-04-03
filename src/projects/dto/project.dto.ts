import { ApiProperty } from "@nestjs/swagger";
import {IsNotEmpty, IsOptional, IsString} from "class-validator";

export class ProjectDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string;
}

export class UpdateProjectDto{
    @ApiProperty()
    @IsOptional()
    @IsString()
    name: string;
    
    @ApiProperty()
    @IsOptional()
    @IsString()
    description: string;
}