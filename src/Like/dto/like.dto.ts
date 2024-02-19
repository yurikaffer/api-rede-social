import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateLikeDto {
    @IsNotEmpty()
    @IsNumber()
    user: number;

    @IsNotEmpty()
    @IsNumber()
    post: number;
}