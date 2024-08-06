import { BadRequestException, Injectable, RequestTimeoutException } from "@nestjs/common";
import { UserDto } from "../dtos/user.dto";
import { Repository } from "typeorm";
import { User } from "../user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async addOne(useDto: UserDto) {
        let existingUser = null


        try {
            existingUser = await this.userRepository.findOne({
                where: { username: useDto.username }
            })
        } catch (error) {
            throw new RequestTimeoutException('发生错误请稍后再试', {
                description: '数据库连接错误'
            })
        }

        if (existingUser) {
            throw new BadRequestException('用户名已存在')
        }

        let newUser = this.userRepository.create(useDto)

        try {
            newUser = await this.userRepository.save(newUser)
        } catch (error) {
           throw new BadRequestException('用户创建失败')
        }

        return newUser
    }
}