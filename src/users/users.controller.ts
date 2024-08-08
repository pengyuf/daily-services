import { Body, Controller, Delete, Get, Param, Post, Query, UseInterceptors } from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './providers/users.service';
import { ResponseInterceptor } from 'src/interceptors/response.interceptor';

@Controller('users')
// @UseInterceptors(ResponseInterceptor)
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) {

    }

    @Get()
    public findAll() {
        return this.usersService.findAll()
    }


    @Get('detail')
    public findOne(@Query() query: any) {
        return this.usersService.findOne(query.username)
    }

    @Post('add')
    public addUser(@Body() userDto: UserDto) {
        return this.usersService.addUser(userDto)
    }
}
