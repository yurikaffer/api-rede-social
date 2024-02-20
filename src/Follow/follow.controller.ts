import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FollowDto } from "./dto/follow.dto";
import { FollowService } from "./follow.service";
import { FollowersModel } from "../entitys/followers.entity";

@UseGuards(AuthGuard('jwt'))
@Controller('/api/v1/')
export class FollowController {
    constructor(private readonly followService: FollowService) {}

    @Post('follow')
    public async create(@Body() body: FollowDto): Promise<{ data: FollowersModel }> {
        const follow = await this.followService.create(body);
        return {data: follow}
    }

    @Get('follows')
    public async getAll(): Promise<{ data: FollowersModel[] }> {
        const listFollowers = await this.followService.findAll();
        return { data: listFollowers };
    }

    @Get('followers/:id')
    public async getAllFollowersByUserId(@Param('id') id: number): Promise<{ data: FollowersModel[] | [] }> {
        const listFollowers = await this.followService.getAllFollowersbyUserId(id);
        return { data: listFollowers };
    }

    @Get('followed/:id')
    public async getAllFollowedByUserId(@Param('id') id: number): Promise<{ data: FollowersModel[] | [] }> {
        const listFollowed = await this.followService.getAllFollowedbyUserId(id);
        return { data: listFollowed };
    }

    @Post('follow/isUserFollowed')
    public async isUserFollowed(@Body() body: FollowDto): Promise<number> {
        const follow = await this.followService.isUserFollowed(body);
        return follow
    }
    
    @Delete('follow/:id')
    public async delete(@Param('id') id: number): Promise<{ message: string }> {
        await this.followService.remove(id);
        return { message: "Usuário deletado com sucesso!" };
    }
}
