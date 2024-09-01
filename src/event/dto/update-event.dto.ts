import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateEventDto  {

  
    @IsOptional()
    @IsString()
    @ApiProperty({})
    @IsDate()
    date: Date;
  
  
}
