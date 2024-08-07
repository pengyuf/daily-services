import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Daily } from "../daily.entity";
import { DataSource, Repository } from "typeorm";
import { Source } from "src/sources/source.entity";

@Injectable()
export class DailysService {
    constructor(
        @InjectRepository(Daily)
        private dailyRepository: Repository<Daily>,

        private readonly dataSource: DataSource
    ) { }

    public async findAll() {
        let list = []

        list = await this.dailyRepository.find({
            relations: {
                sources: true
            }
        })

        return list
    }
    public async findOne(query: any) {
        let list = await this.dailyRepository.find({
            where: { id: query.id },
            relations: {
                sources: true
            },
        })
        return list
    }
    public async addOne(dailyDto: any) {
        const queryRunner = this.dataSource.createQueryRunner()

        await queryRunner.connect()

        // await queryRunner.startTransaction()

        try {
            let newSources = new Source()
            if (dailyDto.sources) {
                dailyDto.sources.split(',').forEach((url, index) => {
                    newSources[`source${index + 1}`] = url
                })
                await queryRunner.manager.save(Source, newSources)
            }

            let newDaily = new Daily()
            newDaily.content = dailyDto.content
            newDaily.wordTotal = dailyDto.wordTotal
            newDaily.weather = dailyDto.weather
            newDaily.address = dailyDto.address
            newDaily.latLon = dailyDto.latLon

            newDaily.sources = newSources

            await queryRunner.manager.save(Daily, newDaily)

            await queryRunner.release()

            // queryRunner.commitTransaction()
        } catch (error) {
            // queryRunner.rollbackTransaction()
            await queryRunner.release()

            throw new BadRequestException('创建失败')
        }

        return '创建成功'

    }

    public async updateOne(dailyDto) {
        const queryRunner = this.dataSource.createQueryRunner()

        await queryRunner.connect()

        const dailyId = dailyDto.id


        const source = await this.dailyRepository.find({
            where: { id: dailyId },
            relations: { sources: true }
        })
        if (source.length) {
            const sourceId = source[0].sources.id

            let newSources = new Source()
            newSources.source1 = ''
            newSources.source2 = ''
            newSources.source3 = ''
            newSources.source4 = ''
            if (dailyDto.sources) {
                dailyDto.sources.split(',').forEach((url, index) => {
                    newSources[`source${index + 1}`] = url
                })
                queryRunner.manager.update(Source, sourceId, newSources)
            }
        }


        let newDaily = new Daily()
        newDaily.content = dailyDto.content
        newDaily.wordTotal = dailyDto.wordTotal
        newDaily.weather = dailyDto.weather
        newDaily.address = dailyDto.address
        newDaily.latLon = dailyDto.latLon

        await queryRunner.manager.update(Daily, dailyId, newDaily)

        await queryRunner.release()

        return '修改成功'
    }


    public async delOne(query) {
        const queryRunner = this.dataSource.createQueryRunner()

        await queryRunner.connect()

        try {
            queryRunner.manager.delete(Source, { daily: query.id })
            queryRunner.manager.delete(Daily, query.id)
        } catch (error) {
            await queryRunner.release()
            throw new BadRequestException('删除失败')
        }
        return '删除成功'
    }
}