import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TasksModule } from './tasks/tasks.module.js';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
import { AdminModule } from './admin/admin.module.js';
import { RankingModule } from './ranking/ranking.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.development.local',
    }),
    MongooseModule.forRoot(process.env.REGISTER_DB_CONNECTION_STRING || '', {
      connectionName: 'register',
    }),
    MongooseModule.forRoot(process.env.ICC_DB_CONNECTION_STRING || '', {
      connectionName: 'icc',
    }),
    TasksModule,
    AuthModule,
    UsersModule,
    AdminModule,
    RankingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
