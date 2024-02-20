import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from "../users/users.service";
import { FollowersModel } from "../entitys/followers.entity";
import { FollowDto } from "./dto/follow.dto";

@Injectable()
export class FollowService {
    constructor(@InjectRepository(FollowersModel) private model: Repository<FollowersModel>, private userService: UsersService) { }

    async create(followDto: FollowDto): Promise<FollowersModel> {
        const follower = await this.userService.findOneById(followDto.follower);
        const followedUser = await this.userService.findOneById(followDto.followed_user);

        const existingFollow = await this.model.findOne({
            where: { follower, followed_user: followedUser },
        });

        if (existingFollow) {
            throw new ConflictException('Usuário já está sendo seguido.');
        }

        const follow = this.model.create({ follower, followed_user: followedUser });
        return await this.model.save(follow);
    }

    async findAll(): Promise<FollowersModel[]> {
        return await this.model.find();
    }

    async getAllFollowersbyUserId(id: number): Promise<FollowersModel[]> {
        const user = await this.userService.findOneById(id)
        return await this.model.find({ where: { follower: { id: user.id }}})
    }

    async getAllFollowedbyUserId(id: number): Promise<FollowersModel[]> {
        const user = await this.userService.findOneById(id)
        return await this.model.find({ where: { followed_user: { id: user.id }}})
    }

    async getIdListFollowedUsers(id: number): Promise<number[]> {
        const followedUsers = await this.model
            .createQueryBuilder('followers_model')
            .leftJoinAndSelect('followers_model.followed_user', 'followed_user')
            .where('followers_model.follower_user_id = :followerId', { followerId: id })
            .getMany();

        const followedListId = followedUsers.map(registro => registro.followed_user.id);
        followedListId.push(Number(id))

        return followedListId;
    }

    async findOneById(id: number): Promise<FollowersModel> {
        const follow = await this.model.findOne({ where: { id } });
        if (!follow) throw new NotFoundException("Seguidor  não encontrado!");
        return follow
    }

    async remove(id: number): Promise<void> {
        const follow = await this.findOneById(id);
        await this.model.remove(follow);
    }

    async isUserFollowed(followerDto: FollowDto): Promise<number | null> {
        try {
            const follower = await this.userService.findOneById(followerDto.follower);
            const followedUser = await this.userService.findOneById(followerDto.followed_user);
            const follow = await this.model.findOne({
                where: {
                    follower: { id: follower.id },
                    followed_user: { id: followedUser.id }
                }
            });
            return follow? follow.id : null

        } catch (error) {
            console.error('Erro durante a verificação de seguidor:', error);
            return null;
        }
    }

}
