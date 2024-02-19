import { Body, Controller, Delete, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { LikeService } from "./like.service";
import { CreateLikeDto } from "src/Like/dto/like.dto";
import { LikesModel } from "src/entitys/likes.entity";

@UseGuards(AuthGuard('jwt'))
@Controller('/api/v1/')
export class LikeController {
    constructor(private readonly likeService: LikeService) {}

    @Post('like')
    public async create(@Body() body: CreateLikeDto): Promise<LikesModel> {
        return await this.likeService.create(body);
    }
    
    @Delete('like/:id')
    public async delete(@Param('id') id: number): Promise<{ message: string }> {
        await this.likeService.remove(id);
        return {message: 'Curtida removida com sucesso!'}
    }
}