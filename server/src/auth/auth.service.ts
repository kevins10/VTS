import { Injectable, Logger } from "@nestjs/common";

import { JwtService } from "@nestjs/jwt";
import { scryptSync, timingSafeEqual } from "crypto";
import { UsersService } from "src/modules/users/users.service";
import { JWT_SECRET, SALT_ROUNDS } from "./secrets";
import { Prisma } from "@prisma/client";

const bcrypt = require("bcrypt");
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(user: Prisma.UserUpdateInput) {
    const payload = {
      user_id: user.user_id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      riot_name: user.riot_name,
      riot_tag: user.riot_tag,
      user_type: user.user_type,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (user && passwordMatch) {
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }
}
