import { IsNotEmpty, IsUUID} from "class-validator";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { ACCES_LEVEL, ROLES } from "src/constants/roles";
import { ProjectsEntity } from "src/projects/entities/projects.entity";
import { UsersEntity } from "../entities/users.entity";

export class UserDto{
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsNumber()
    age: number;

    @IsEnum(ROLES)
    @IsNotEmpty()
    role: ROLES;
}

export class UserUpdateDto{
    @IsOptional()
    @IsString()
    firstName: string;

    @IsOptional()
    @IsString()
    lastName: string;

    @IsOptional()
    @IsString()
    email: string;

    @IsOptional()
    @IsString()
    username: string;

    @IsOptional()
    @IsString()
    password: string;

    @IsOptional()
    @IsNumber()
    age: number;

    @IsOptional()
    @IsEnum(ROLES)
    role: ROLES;
}

export class UserToProjectDto{
    @IsNotEmpty()
    @IsUUID()
    user: UsersEntity;

    @IsNotEmpty()
    @IsUUID()
    project: ProjectsEntity;

    @IsNotEmpty()
    @IsEnum(ACCES_LEVEL)
    acccesLevel: ACCES_LEVEL;
}