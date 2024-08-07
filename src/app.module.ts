import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DailysModule } from './dailys/dailys.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Daily } from './dailys/daily.entity';
import { User } from './users/user.entity';
import { Source } from './sources/source.entity';
import { UsersModule } from './users/users.module';
import { SorucesModule } from './sources/sources.module';
import { SysMiddleware } from './middlewares/sys.middleware';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    DailysModule,
    UsersModule,
    SorucesModule,
    TypeOrmModule.forRoot({
      entities: [Daily, User, Source],
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
        // consumer.apply(SysMiddleware).forRoutes('*') // 匹配所有的路径
        consumer.apply(SysMiddleware).forRoutes({path:'/dailys/list',method:RequestMethod.GET}) // 匹配某个路径
  }
}
