import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateEventDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'Title of the event' })
    title: string;
  
    @IsDate()
    @IsNotEmpty()
    @ApiProperty({ description: 'Date of the event' })
    date: Date;
  
    @IsNumber()
    @IsOptional()
    @ApiProperty({ description: 'ID of the organizer (User)' })
    organized_by_id?: number;


  @IsArray()
  @IsOptional()
  @ApiProperty({ description: 'Array of attendee IDs' })
  attendees_ids?: number[];
}
