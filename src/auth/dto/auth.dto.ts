import { IsNotEmpty, IsString } from "class-validator";

export class AuthBodyDto{
    @IsNotEmpty()
    @IsString()
    username:string;
    @IsNotEmpty()
    @IsString()
    password:string;
}