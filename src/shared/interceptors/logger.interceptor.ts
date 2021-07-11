import { CallHandler, ExecutionContext, HttpException, HttpStatus, NestInterceptor } from "@nestjs/common";
import { catchError, Observable, tap, throwError } from "rxjs";


export class LoggerInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler) : Observable<any> {
        const now = Date.now();
        return next.handle().pipe(
            tap(() => console.log(`After...${Date.now() - now}ms`))
        )
    }
}