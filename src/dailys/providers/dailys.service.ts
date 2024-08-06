import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Daily } from "../daily.entity";
import { Repository } from "typeorm";

@Injectable()
export class DailysService {
    constructor(
        @InjectRepository(Daily)
        private dailyRepository: Repository<Daily>
    ) { }

    public async findAll() {

    }
    public async findOne(query: any) {
        // let list = await this.dailyRepository.findOneBy(
        //     { id: query.id }
        // )
        // return list
    }
    public async addOne(dailyDto) {

    }
    public async updateOne(dailyDto) {

    }
    public async delOne(query) {

    }
}