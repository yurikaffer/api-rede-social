import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from "../users/users.service";
import { PostService } from "../Post/post.service";
import { CommentsModel } from "../entitys/comments.entity";
import { CreateCommentDto } from "./dto/comment.dto";

@Injectable()
export class CommentService {
    constructor(@InjectRepository(CommentsModel)
    private model: Repository<CommentsModel>,
        private userService: UsersService,
        private postService: PostService

    ) { }

    async create(commentDto: CreateCommentDto): Promise<CommentsModel> {
        const user = await this.userService.findOneById(commentDto.user)
        const post = await this.postService.findOneById(commentDto.post)

        const comment = this.model.create({
            user: user,
            post: post,
            content: commentDto.content
        });

        return await this.model.save(comment);
    }

    async findOneById(id: number): Promise<CommentsModel> {
        const comment = await this.model.findOne({ where: { id } });
        if (!comment) throw new NotFoundException("Erro ao obter curtida!");
        return comment
    }

    async remove(id: number): Promise<void> {
        const comment = await this.findOneById(id);
        await this.model.remove(comment);
    }
}
