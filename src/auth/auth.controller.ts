import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.services';
import { UserDto } from 'src/users/dtos/user.dto';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Public()
    @Post('login')
    signIn(@Body() userDto: UserDto) {
        console.log('login',userDto)
        return this.authService.signIn(userDto.username, userDto.password)
    }

    @Public()
    @Post('register')
    register(@Body() userDto: UserDto) {
        return this.authService.register(userDto)
    }
}
