import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Public } from '@decorators/public.decorator';
import { CreateUserDto, LoginApiDto, UserResponseDto } from '@dtos/user.dto';
import UserFacade from '@facades/user.facade';
import { AuthGuard } from '@guard/auth.guard';

@Controller('auth')
@ApiTags('auth')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class AuthController {
    constructor(private readonly userFacade: UserFacade) {}

    @Post()
    @Public()
    @ApiOperation({ summary: 'Log in to the system' })
    @ApiBody({ type: LoginApiDto })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Successful login',
        type: String,
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Invalid credentials',
    })
    login(@Body() data: LoginApiDto): Promise<string> {
        return this.userFacade.login(data);
    }

    @Post('register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Successful registration',
    })
    register(@Body() data: CreateUserDto): Promise<UserResponseDto> {
        return this.userFacade.createUser(data);
    }
}
