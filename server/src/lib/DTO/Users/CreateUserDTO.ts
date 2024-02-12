import { ApiProperty } from "@nestjs/swagger";
import { UserType } from "@prisma/client";

export class CreateUserDTO {
  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  phone_number: string;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  riot_name: string;

  @ApiProperty()
  riot_tag: string;

  @ApiProperty()
  profilePicture: string;

  @ApiProperty()
  date_of_birth: string;

  @ApiProperty()
  user_type: UserType;
}
