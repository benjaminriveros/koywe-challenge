import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsEmail, IsString, Length, Matches } from 'class-validator';

export interface UserDto {
    id: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
export class LoginApiDto {
    @ApiProperty({ description: 'The email of the user', example: 'admin@mail.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'The password of the user', example: '123456' })
    @IsString()
    password: string;
}


export class UserResponseDto {
    @ApiProperty({ description: 'Unique identifier of the user' })
    id: string;

    @ApiProperty({ description: 'Email address of the user' })
    email: string;

    @Exclude()
    password: string;

    @ApiProperty({ description: 'Date when the user was created' })
    createdAt: Date;

    @ApiProperty({ description: 'Date when the user was last updated' })
    updatedAt: Date;

    constructor(partial: Partial<UserResponseDto>) {
        Object.assign(this, partial);
    }
}

export class CreateUserDto {
    @ApiProperty({ description: 'Email address of the user' })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'Password of the user' })
    @IsString()
    @Length(8)
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/, {
        message: 'Password must contain at least one letter and one number',
    })
    password: string;
}
