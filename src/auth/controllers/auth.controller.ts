import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthBodyDto } from '../dto/auth.dto';
import { AuthService } from '../services/auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authservice: AuthService) { }
    @Post('login')
    public async login(@Body() {username,password}:AuthBodyDto){
        const userValidate = await this.authservice.validateUser(username,password);
        if(!userValidate){
            throw new UnauthorizedException('Invalid credentials');
        }

        return await this.authservice.generateJWT(userValidate);
    }
}
