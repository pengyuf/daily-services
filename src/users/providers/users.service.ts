import { BadRequestException, HttpException, Injectable, RequestTimeoutException } from "@nestjs/common";
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

    async findAll() {
        const list = this.userRepository.find()
        return list
    }

    async findOne(username: string) {
        let user;

        try {
            user = await this.userRepository.findOne({
                where: { username }
            })
        } catch (error) {
            throw new BadRequestException('用户不存在')
        }

        if (!user) {
            throw new BadRequestException('用户不存在')
        }
        return user
    }

    async addUser(useDto: UserDto) {
        let existingUser = null
        try {
            existingUser = await this.userRepository.findOne({
                where: { username: useDto.username }
            })
        } catch (error) {
            throw new BadRequestException('创建失败')
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