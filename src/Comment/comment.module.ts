import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { PostModule } from "src/Post/post.module";
import { CommentsModel } from "src/entitys/comments.entity";
import { CommentService } from "./comment.service";
import { CommentController } from "./comment.controller";

@Module({
    imports: [TypeOrmModule.forFeature([CommentsModel]), UsersModule, PostModule],
    providers: [CommentService],
    controllers: [CommentController],
    exports: [CommentService]
})
export class CommentModule {}