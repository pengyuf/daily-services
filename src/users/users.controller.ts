import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './providers/users.service';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) {

    }

    @Post()
    public addOne(@Body() userDto: UserDto) {
        return this.usersService.addOne(userDto)
    }
}
