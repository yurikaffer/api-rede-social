import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { PostService } from "./post.service";
import { PostModel } from "src/entitys/post.entity";
import { PostDto } from "src/Post/dto/post.dto";
import { AuthGuard } from "@nestjs/passport";

@UseGuards(AuthGuard('jwt'))
@Controller('/api/v1/')
export class PostController {
    constructor(private readonly postService: PostService) { }

    @Post('post')
    public async create(@Body() body: PostDto): Promise<{ data: PostModel }> {
        const post = await this.postService.create(body);
        return { data: post };
    }

    @Get('post/:id')
    public async getOne(@Param('id') id: number): Promise<{ data: PostModel }> {
        const post = await this.postService.findOneById(id);
        return { data: post };
    }

    @Get('posts/user/:id')
    public async getAllByUserId(@Param('id') id: number): Promise<{ data: PostModel[] }> {
        const postList = await this.postService.getAllByUserId(id);
        return { data: postList };
    }
    @Get('posts/:id')
    public async getPostsFromHome(@Param('id') id: number): Promise<{ data: PostModel[] }> {
        const post = await this.postService.getPostsFromHomeByUser(id);
        return { data: post };
    }

    @Get('posts')
    public async getAll(): Promise<{ data: PostModel[] }> {
        const listPosts = await this.postService.findAll();
        return { data: listPosts };
    }

    @Put('post/:id')
    public async update(@Param('id') id: number, @Body() body: PostDto): Promise<{ data: PostModel }> {
        const post = await this.postService.update(id, body);
        return { data: post };
    }

    @Delete('post/:id')
    public async delete(@Param('id') id: number): Promise<{ message: string }> {
        await this.postService.remove(id);
        return { message: "Post deletado com sucesso!" };
    }
}