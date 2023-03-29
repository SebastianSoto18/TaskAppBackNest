import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Delete, Put, UseGuards } from '@nestjs/common/decorators';
import { PublicAccess } from 'src/auth/decorator/public.decorator';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserDto, UserToProjectDto, UserUpdateDto } from '../dto/user.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
@UseGuards(AuthGuard,RolesGuard)
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

    @Roles('ADMIN')
    @Get('all')
    public async FindUsers(): Promise<any> {
        return await this.usersService.FindUsers();
    }

    @PublicAccess()
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
