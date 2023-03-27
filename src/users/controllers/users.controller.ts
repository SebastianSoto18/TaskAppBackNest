import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Delete, Put } from '@nestjs/common/decorators';
import { UserDto, UserToProjectDto, UserUpdateDto } from '../dto/user.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('user')
    public async CreateUser(@Body() body:UserDto): Promise<any> {
        return await this.usersService.CreateUser(body);
    }

    @Post('user-to-project')
    public async UserToProject(@Body() body: UserToProjectDto): Promise<any> {
        return await this.usersService.AddUserToProject(body);
    }

    @Get('all')
    public async FindUsers(): Promise<any> {
        return await this.usersService.FindUsers();
    }

    @Get(':id')
    public async FindUserById(@Param('id') id: string): Promise<any> {
        return await this.usersService.FindUserById(id);
    }

    @Put(':id')
    public async UpdateUser(@Param('id') id: string, @Body() body: UserUpdateDto): Promise<any> {
        return await this.usersService.UpdateUser(id, body);
    }
    @Delete(':id')
    public async DeleteUser(@Param('id') id: string): Promise<any> {
        return await this.usersService.DeleteUser(id);
    }
}
