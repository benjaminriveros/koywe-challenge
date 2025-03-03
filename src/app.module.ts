import UserDal from '@dal/type/user.dal';
import LoginFacade from '@facades/user.facade';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import Connection from './connection';
import { AuthController } from './controller/auth.controller';

@Module({
    imports: [       
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET_KEY,
            signOptions: { expiresIn: '12h' },
        }),
    ],
    controllers: [AuthController],
    providers: [
        Connection,
        LoginFacade,
        UserDal,
    ],
})
export class AppModule {}