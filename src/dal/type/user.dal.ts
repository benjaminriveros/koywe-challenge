import { CreateUserDto, UserDto } from '@dtos/user.dto';
import { Injectable } from '@nestjs/common';
import Connection from 'src/connection/index';

@Injectable()
export default class UserDal {
    constructor(private readonly connection: Connection) {}

    async findByEmail(email: string): Promise<UserDto> {
        return this.connection.user.findUnique({ where: { email } });
    }

    async createUser(user: CreateUserDto): Promise<UserDto> {
        return this.connection.user.create({
            data: user,
        });
    }
}
