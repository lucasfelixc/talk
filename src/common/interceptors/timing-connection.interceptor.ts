import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs';

export class TimingConnectionInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    console.log('TimingConnectionInterceptor executado ANTES.');

    await new Promise((resolve) => setTimeout(resolve, 5000));

    return next.handle().pipe(
      tap(() => {
        console.log('TimingConnectionInterceptor executado DEPOIS.');
      }),
    );
  }
}
