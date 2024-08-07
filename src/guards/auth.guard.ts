import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        const token = context.switchToRpc().getData().headers.token;

        if (this.hasUrl(this.urlList, request.url)) {
            return true
        }

        if (token) {
            try {
                return true
            } catch (error) {
                throw new HttpException(
                    '没有访问权限',
                    HttpStatus.UNAUTHORIZED
                )
            }
        } else {
            throw new HttpException(
                '没有token,请先登录',
                HttpStatus.UNAUTHORIZED
            )
        }
    }

    // 白名单
    private urlList: string[] = []

    private hasUrl(urlList: string[], url: string): boolean {
        let flag: boolean = false
        if (urlList.indexOf(url) >= 0) {
            flag = true
        }
        return flag
    }
}

