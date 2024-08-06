import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DailysModule } from './dailys/dailys.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Daily } from './dailys/daily.entity';
import { User } from './users/user.entity';
import { Source } from './sources/source.entity';
import { UsersModule } from './users/users.module';
import { SorucesModule } from './sources/sources.module';

@Module({
  imports: [
    DailysModule,
    UsersModule,
    SorucesModule,
    TypeOrmModule.forRoot({
      entities: [Daily,User,Source],
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'daily-app',
      synchronize: true, // 注意：在生产环境中不建议使用，可能会导致数据丢失
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
