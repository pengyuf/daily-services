import { Body, Controller, Delete, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './providers/users.service';
import { ResponseInterceptor } from 'src/interceptors/response.interceptor';

@Controller('users')
@UseInterceptors(ResponseInterceptor)
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) {

    }

    @Get()
    public findAll() {
        return this.usersService.findAll()
    }

    @Post()
    public addOne(@Body() userDto: UserDto) {
        return this.usersService.addOne(userDto)
    }
}
