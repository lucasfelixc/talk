import type { NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

export class SimpleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('SimpleMiddleware is working!');

    req['user'] = {
      name: 'John Doe',
    };

    // Ending the request chain
    // return res.status(400).send({
    //   message: 'Não encontrado',
    // });

    // Continuing the request chain
    next();
  }
}
