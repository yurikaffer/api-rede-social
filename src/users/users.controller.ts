import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { UsersService } from './users.service';
import { UsersModel } from '../entitys/users.entity';
import { CreateUserDto, UpdateUserDto, userUpdateImg } from './dto/user.dto';
import { AuthGuard } from "@nestjs/passport";
import { UserInterface } from "./dto/user.interface";

@Controller('/api/v1/')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('user')
    public async create(@Body() body: CreateUserDto): Promise<{ data: UsersModel | { error: string } }> {
        const user = await this.usersService.create(body);
        return { data: user };
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('user/:id')
    public async getOne(@Param('id') id: number): Promise<{ data: UserInterface }> {
        const user = await this.usersService.mapUserModelToUser(await this.usersService.findOneById(id));
        return { data: user };
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('users')
    public async getAll(): Promise<{ data: Partial<UsersModel>[] }> {
        const listUsers = await this.usersService.findAll();
        return { data: listUsers };
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('users/home')
    public async getUsersFromHome(): Promise<{ data: Partial<UsersModel>[] }> {
        const listUsers = await this.usersService.findUsersFromHome();
        return { data: listUsers };
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('user/:id')
    public async update(@Param('id') id: number, @Body() body: UpdateUserDto): Promise<{ data: UserInterface }> {
        const user = await this.usersService.mapUserModelToUser(await this.usersService.update(id, body));
        return { data: user };
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('user/:id/imgUpdate')
    public async updateImg(@Param('id') id: number, @Body() body: userUpdateImg): Promise<{ data: UserInterface }> {
        const user = await this.usersService.mapUserModelToUser(await this.usersService.updateImg(id, body));
        return { data: user };
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('user/:id')
    public async delete(@Param('id') id: number): Promise<{ message: string }> {
        await this.usersService.remove(id);
        return { message: "Usuário deletado com sucesso!" };
    }
}
