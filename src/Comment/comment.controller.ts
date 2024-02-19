import { Body, Controller, Delete, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "src/Comment/dto/comment.dto";
import { CommentsModel } from "src/entitys/comments.entity";

@UseGuards(AuthGuard('jwt'))
@Controller('api/v1/comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Post()
    public async create(@Body() body: CreateCommentDto): Promise<CommentsModel> {
        return await this.commentService.create(body);
    }
    
    @Delete(':id')
    public async delete(@Param('id') id: number): Promise<{message: string}> {
        await this.commentService.remove(id);
        return { message: "Comentário deletado com sucesso!" };
    }
}