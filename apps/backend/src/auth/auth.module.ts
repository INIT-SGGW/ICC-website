import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserAuthGuard } from './auth.guard.js';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [],
  providers: [UserAuthGuard],
  exports: [UserAuthGuard, JwtModule],
})
export class AuthModule {}
