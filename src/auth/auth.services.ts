import { BadRequestException, Injectable, RequestTimeoutException, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/providers/users.service";
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) { }

    async signIn(username: string, pass: string) {
        const user = await this.userService.findOne(username)
        if (user?.password !== pass) {
            throw new BadRequestException('密码错误')
        }
        const payload = { sub: user.id, username: user.username }
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}