import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AdminAuthGuard } from './admin.guard.js';
import { SoftUserAuthGuard, UserAuthGuard } from './user.guard.js';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [],
  providers: [UserAuthGuard, AdminAuthGuard, SoftUserAuthGuard],
  exports: [UserAuthGuard, AdminAuthGuard, SoftUserAuthGuard, JwtModule],
})
export class GuardsModule {}
