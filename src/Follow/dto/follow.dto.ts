import { IsNotEmpty, IsNumber } from "class-validator";

export class FollowDto {
    @IsNotEmpty()
    @IsNumber()
    follower: number

    @IsNotEmpty()
    @IsNumber()
    followed_user: number;
}