import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LikesModel } from "src/entitys/likes.entity";
import { CreateLikeDto } from "src/Like/dto/like.dto";
import { UsersService } from "src/users/users.service";
import { PostService } from "src/Post/post.service";

@Injectable()
export class LikeService {
    constructor(@InjectRepository(LikesModel)
    private model: Repository<LikesModel>,
        private userService: UsersService,
        private postService: PostService

    ) { }

    async create(likeDto: CreateLikeDto): Promise<LikesModel> {
        const user = await this.userService.findOneById(likeDto.user);
        const post = await this.postService.findOneById(likeDto.post);

        const existingLike = await this.model.findOne({
            where: {
              user: { id: user.id }, 
              post: { id: post.id }, 
            },
          });

        if (existingLike) {
            throw new ConflictException("Usuário já curtiu a esse post!")
        }

        const like = this.model.create({ user, post });
        return await this.model.save(like);
    }

    async findOneById(id: number): Promise<LikesModel> {
        const like = await this.model.findOne({ where: { id } });
        if (!like) throw new NotFoundException("Erro ao obter curtida!");
        return like
    }

    async remove(id: number): Promise<void> {
        const like = await this.findOneById(id);
        await this.model.remove(like);
    }
}
