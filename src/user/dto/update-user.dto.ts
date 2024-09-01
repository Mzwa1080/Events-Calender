import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    
    @IsString()
    @ApiProperty({description: "full_name", example:'Mzwamadoda Louw'})
    @IsOptional()
    full_name : string;

    @IsString()
    @ApiProperty({description: 'email', example:'m@gmail.com'})
    @IsOptional()
    email : string;



    @IsString()
    @ApiProperty({description : 'password', example:'123456'})
    @IsOptional()
    password : string;
}
