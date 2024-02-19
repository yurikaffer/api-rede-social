import {  IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class UserDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(120)
    name: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(120)
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsString()
    userName: string

    @IsString()
    biography: string
}

export class UpdateUserDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(55)
    name: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(120)
    @IsEmail()
    email: string

    @IsString()
    password: string

    @IsNotEmpty()
    @IsString()
    userName: string

    @IsString()
    biography: string
}

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(120)
    name: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(120)
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsString()
    userName: string
}

export class userUpdateImg {
    @IsNotEmpty()
    @IsString()
    filePath: string
}