import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FollowersModel } from "src/entitys/followers.entity";
import { FollowService } from "./follow.service";
import { FollowController } from "./follow.controller";
import { UsersModule } from "src/users/users.module";

@Module({
    imports: [TypeOrmModule.forFeature([FollowersModel]), UsersModule],
    providers: [FollowService],
    controllers: [FollowController],
    exports: [FollowService]
})
export class FollowModule {}