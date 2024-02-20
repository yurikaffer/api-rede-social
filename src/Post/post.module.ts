import { Module } from "@nestjs/common";
import { PostService } from "./post.service";
import { PostController } from "./post.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostModel } from "../entitys/post.entity";
import { UsersModule } from "../users/users.module";
import { FollowModule } from "../Follow/follow.module";

@Module({
    imports: [TypeOrmModule.forFeature([PostModel]), UsersModule, FollowModule],
    providers: [PostService],
    controllers: [PostController],
    exports: [PostService]
})
export class PostModule {}