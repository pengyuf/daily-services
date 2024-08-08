import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";

interface Response<T> {
    data: T
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const ctx = context.switchToHttp()
        const request = ctx.getRequest()
        console.log('进入全局响应拦截器')
        return next.handle().pipe(
            map(data => {
                console.log('进入全局响应拦截器返回内容后')
                return {
                    statusCode: HttpStatus.OK,
                    message: '请求成功',
                    data: data
                }
            })
        )
    }
}