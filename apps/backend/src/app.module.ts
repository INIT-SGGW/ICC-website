import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env.local"
    }),
    MongooseModule.forRoot(process.env.DB_CONNECTION_STRING || ""),
    TasksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
