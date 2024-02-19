import { UsersModule } from './users/users.module';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './Post/post.module';
import { FollowModule } from './Follow/follow.module';
import { LikeModule } from './Like/like.module';
import { CommentModule } from './Comment/comment.module';
import * as express from 'express';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['dist/**/*.entity.*'],
      migrations: [`dist/migration/{.ts,*.js}`],
      migrationsRun: true
    }),
    UsersModule,
    AuthModule,
    PostModule,
    FollowModule,
    LikeModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(express.static('uploads'))
      .forRoutes('uploads');
  }
}