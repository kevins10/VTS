import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./passport/jwt-Auth.guard";
import { LocalAuthGuard } from "./passport/local-auth.guard";
import { Public } from "./public";
import { Prisma } from "@prisma/client";
import { UsersService } from "src/modules/users/users.service";
import { CreateUserDTO } from "src/lib/DTO/Users/CreateUserDTO";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) {}

  @Public()
  @Post("register")
  register(@Body() createUserDto: CreateUserDTO) {
    return this.userService.createUser(createUserDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post("login")
  loginJWT(@Request() req): Promise<any> {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("protected")
  getLoginRequest(@Request() req): string {
    return req.user;
  }
}
