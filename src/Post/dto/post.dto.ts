import { IsEmpty, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class PostDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(4096)
    content: string;

    @IsNotEmpty()
    @IsNumber()
    user_id: number;

    imgURL: string;
}