import { IsNotEmpty, IsUUID} from "class-validator";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { ACCES_LEVEL, ROLES } from "src/constants/roles";
import { ProjectsEntity } from "src/projects/entities/projects.entity";
import { UsersEntity } from "../entities/users.entity";
import { ApiProperty } from "@nestjs/swagger";

export class UserDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    lastName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    age: number;

    @ApiProperty()
    @IsEnum(ROLES)
    @IsNotEmpty()
    role: ROLES;
}

export class UserUpdateDto{
    @ApiProperty()
    @IsOptional()
    @IsString()
    firstName: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    lastName: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    email: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    username: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    password: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    age: number;

    @ApiProperty()
    @IsOptional()
    @IsEnum(ROLES)
    role: ROLES;
}

export class UserToProjectDto{
    @IsNotEmpty()
    @IsUUID()
    user: UsersEntity;

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    project: ProjectsEntity;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(ACCES_LEVEL)
    acccesLevel: ACCES_LEVEL;
}