import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from 'express'

@Injectable()
export class SysMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: () => void) {
        console.log('开始执行中间件Sys')
        next();
        console.log('结束执行中间件Sys')
    }
}