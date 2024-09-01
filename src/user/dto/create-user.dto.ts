import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: "full_name", example:'Mzwamadoda Louw'})
    full_name : string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: 'email', example:'m@gmail.com'})
    email : string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description : 'bio', example:'New to coding going!!'})
    bio : string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description : 'password', example:'123456'})
    password : string;

}   

