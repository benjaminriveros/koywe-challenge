import UserDal from '@dal/type/user.dal';
import { CreateUserDto, LoginApiDto, UserResponseDto } from '@dtos/user.dto';
import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export default class LoginFacade {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userDal: UserDal,
    ) {}

    async login(data: LoginApiDto): Promise<string> {
        let token = null;
        try {
            const user = await this.userDal.findByEmail(data.email);
            if (user) {
                if (user.password === data.password) {
                    const payload = {
                        sub: user.id,
                        email: user.email,
                    };

                    token = await this.jwtService.signAsync(payload, {
                        expiresIn: '4h',
                    });
                }
            }
        } catch (error) {
            throw new InternalServerErrorException('Internal server error');
        }

        if (!token) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return token;
    }

    async createUser(data: CreateUserDto): Promise<UserResponseDto> {
        const user = await this.userDal.findByEmail(data.email);
        if (user) {
            throw new BadRequestException('User already exists');
        }
        const newUser = await this.userDal.createUser(data);

        return new UserResponseDto(newUser);
    }
}
