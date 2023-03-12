import { IsNotEmpty} from "class-validator";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator/types/decorator/decorators";
import { ROLES } from "src/constants/roles";

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

    @IsNotEmpty()
    @IsNumber()
    age: number;

    @IsEnum(ROLES)
    @IsNotEmpty()
    role: ROLES;
}