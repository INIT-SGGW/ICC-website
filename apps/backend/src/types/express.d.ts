import type { UserTokenDataDTO } from './dtos.ts';

declare global {
  namespace Express {
    interface Request {
      user?: UserTokenDataDTO;
    }
  }
}
