import { LikesModel } from "../entitys/likes.entity";
import { LikeService } from "./like.service";
import { LikeController } from "./like.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { UsersModule } from "../users/users.module";
import { PostModule } from "../Post/post.module";

@Module({
    imports: [TypeOrmModule.forFeature([LikesModel]), UsersModule, PostModule],
    providers: [LikeService],
    controllers: [LikeController],
    exports: [LikeService]
})
export class LikeModule {}