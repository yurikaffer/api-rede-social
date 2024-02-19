import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UsersModel } from '../entitys/users.entity';
import { CreateUserDto, UpdateUserDto, userUpdateImg } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInterface } from './dto/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UsersModel) private model: Repository<UsersModel>) { }

    async create(userDto: CreateUserDto): Promise<UsersModel | { error: string }> {
        const existingUserEmail = await this.model.findOne({ where: { email: userDto.email } });
        const existingUserName = await this.model.findOne({ where: { userName: userDto.userName } });
    
        if (existingUserEmail) {
            return { error: 'E-mail já está em uso.' };
        } else if (existingUserName) {
            return { error: 'Nome de usuário já está em uso.' };
        }
    
        const user = this.model.create(userDto);
        return await this.model.save(user);
    }

    async findAll(): Promise<Partial<UsersModel>[]> {
        const users = await this.model.find();
        return users.map(({ password, ...userWithoutPassword }) => userWithoutPassword);
    }

    async findUsersFromHome(): Promise<Partial<UsersModel>[]> {
        const users = await this.model.find({
            order: {
                createdAt: 'DESC'
            },
            take: 8 // Limita a consulta para 5 resultados
        });
        return users.map(({ password, ...userWithoutPassword }) => userWithoutPassword);
    }

    async update(id: number, userDto: UpdateUserDto): Promise<UsersModel> {
        const user = await this.findOneById(id);

        if (userDto.password) {
            userDto.password = await bcrypt.hash(userDto.password, 10);
        } else {
            userDto.password = user.password;
        }
        Object.assign(user, userDto);
        return await this.model.save(user);
    }

    async updateImg(id: number, imgURL: userUpdateImg): Promise<UsersModel> {
        const user = await this.findOneById(id);
        Object.assign(user, imgURL);
        return await this.model.save(user);
    }

    async remove(id: number): Promise<void> {
        const user = await this.findOneById(id);
        await this.model.remove(user);
    }

    async findOneByEmail(email: string): Promise<UsersModel> {
        const user = await this.model.findOne({ where: { email } });
        if (!user) {
            throw new NotFoundException("Usuário inválido!");
        }
        return user;
    }

    async findOneByUserName(userName: string): Promise<UsersModel> {
        const user = await this.model.findOne({ where: { userName: userName } });

        if (!user) {
            throw new NotFoundException("Usuário inválido!");
        }
        return user;
    }

    async findOneById(id: number): Promise<UsersModel> {
        const user = await this.model.findOne({ where: { id } });
        if (!user) throw new NotFoundException("Usuário não encontrado!");
        return user;
    }

    async mapUserModelToUser(userModel: UsersModel): Promise<UserInterface> {
        const { id, name, email, createdAt, filePath, userName, biography } = userModel;
        return { id, name, email, createdAt, filePath, userName, biography };
    }
}
