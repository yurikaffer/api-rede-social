import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from 'typeorm';
import { PostModel } from "../entitys/post.entity";
import { PostDto } from "./dto/post.dto";
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from "../users/users.service";
import { FollowService } from "../Follow/follow.service";

@Injectable()
export class PostService {
    constructor(@InjectRepository(PostModel)
    private model: Repository<PostModel>,
        private userService: UsersService,
        private followService: FollowService
    ) { }

    async create(postDto: PostDto): Promise<PostModel> {
        const user = await this.userService.findOneById(postDto.user_id)
        const post = this.model.create({ ...postDto, user });
        return await this.model.save(post);
    }

    async findAll(): Promise<PostModel[]> {
        return await this.model.find();
    }

    async update(id: number, postDto: PostDto): Promise<PostModel> {
        const post = await this.findOneById(id);
        Object.assign(post, postDto);
        return await this.model.save(post);
    }

    async remove(id: number): Promise<void> {
        const post = await this.findOneById(id);
        await this.model.remove(post);
    }

    async findOneById(id: number): Promise<PostModel> {
        const post = await this.model.findOne({ where: { id } });
        if (!post) throw new NotFoundException("Post não encontrado!");
        return post;
    }

    async getAllByUserId(id: number): Promise<PostModel[]> {

        const postList = await this.model
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.user', 'user')

            .leftJoinAndSelect('post.likes', 'likes')
            .leftJoin('likes.user', 'likeUser')
            .addSelect(['likeUser.id', 'likeUser.name'])

            .leftJoinAndSelect('post.comments', 'comments')
            .leftJoin('comments.user', 'commentUser')
            .addSelect(['commentUser.id', 'commentUser.name', 'commentUser.userName', 'commentUser.filePath'])

            .where('post.user_id = (:id)', { id })
            .orderBy('post.createdAt', 'DESC')
            .getMany();

        return postList;
    }

    async getPostsFromHomeByUser(id: number): Promise<PostModel[]> {
        const listaDeIds = await this.followService.getIdListFollowedUsers(id);

        const posts = await this.model
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.user', 'user')

            .leftJoinAndSelect('post.likes', 'likes')
            .leftJoin('likes.user', 'likeUser')
            .addSelect(['likeUser.id', 'likeUser.name'])

            .leftJoinAndSelect('post.comments', 'comments')
            .leftJoin('comments.user', 'commentUser')
            .addSelect(['commentUser.id', 'commentUser.name', 'commentUser.userName', 'commentUser.filePath'])

            .where('post.user_id IN (:...listaDeIds)', { listaDeIds })
            .orderBy('post.createdAt', 'DESC')
            .getMany();

        return posts;
    }
}
