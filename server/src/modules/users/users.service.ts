import { Injectable, Logger } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { PrismaService } from "prisma/prisma.service";
import { SALT_ROUNDS } from "src/auth/secrets";

import * as bcrypt from "bcrypt";
import { CreateUserDTO } from "src/lib/DTO/Users/CreateUserDTO";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: CreateUserDTO): Promise<User> {
    // Encrypt password with automatic salt generated
    const encryptedPassword = await bcrypt.genSalt(SALT_ROUNDS).then((salt) => {
      return bcrypt.hash(data.password, salt);
    });

    // Convert Date of Birth string to Date Object
    const dateOfBirth = new Date(data.date_of_birth);

    // Convert string to Buffer (base64 for files/images)
    const imageBuffer = Buffer.from(data.profilePicture, "base64");

    // Map DTO values to Prisma data type
    const createUserInput: Prisma.UserCreateInput = {
      username: data.username,
      email: data.email,
      password: encryptedPassword,
      phone_number: data.phone_number,
      first_name: data.first_name,
      last_name: data.last_name,
      riot_name: data.riot_name,
      riot_tag: data.riot_tag,
      profilePicture: imageBuffer,
      date_of_birth: dateOfBirth,
      user_type: data.user_type,
    };

    return await this.prisma.user.create({
      data: {
        ...createUserInput,
      },
    });
  }

  async findUserById(user_id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        user_id: user_id,
      },
    });

    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.prisma.user
      .findUnique({
        where: {
          email: email,
        },
        include: {
          teams: true,
        },
      })
      .catch((e) => {
        console.log(`ERROR: ${e}`);
        return null;
      });
  }

  async findUserByPhone(phone_number: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: {
        phone_number: phone_number,
      },
    });
  }

  async updateUserById(
    user_id: string,
    updateUserInput: Prisma.UserUpdateInput
  ) {
    return this.prisma.user.update({
      where: {
        user_id: user_id,
      },
      data: updateUserInput,
    });
  }

  async updateUserByEmail(
    email: string,
    updateUserInput: Prisma.UserUpdateInput
  ) {
    return this.prisma.user.update({
      where: {
        email: email,
      },
      data: updateUserInput,
    });
  }

  async removeUserById(user_id: string) {
    return await this.prisma.user.delete({
      where: {
        user_id: user_id,
      },
    });
  }

  async removeUserByEmail(email: string) {
    return await this.prisma.user.delete({
      where: {
        email: email,
      },
    });
  }

  async findUserProfilePicture(
    user_id: string
  ): Promise<{ profilePicture: Buffer }> {
    return await this.prisma.user.findUnique({
      where: {
        user_id: user_id,
      },
      select: {
        profilePicture: true,
      },
    });
  }

  async updateDiscord(user_id: string, discord: string) {
    return this.prisma.user.update({
      where: {
        user_id: user_id,
      },
      data: {
        discord: discord,
      },
    });
  }
}
