import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Logger,
	HttpStatus,
	HttpException,
	Res,
} from "@nestjs/common";
import { UsersService } from "src/modules/users/users.service";
import { Prisma } from "@prisma/client";
import { Response } from "express";

@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get("get/id/:id")
	findById(@Param("id") id: string) {
		return this.usersService.findUserById(id);
	}

	@Get("get/email/:email")
	findByEmail(@Param("email") email: string) {
		return this.usersService.findUserByEmail(email);
	}

	@Patch("update/id/:id")
	updateById(
		@Param("id") id: string,
		@Body() updateUserInput: Prisma.UserUpdateInput
	) {
		return this.usersService.updateUserById(id, updateUserInput);
	}

	@Patch("update/email/:email")
	updateByEmail(
		@Param("email") email: string,
		@Body() updateUserInput: Prisma.UserUpdateInput
	) {
		return this.usersService.updateUserByEmail(email, updateUserInput);
	}

	@Delete("delete/id/:id")
	removeById(@Param("id") id: string) {
		return this.usersService.removeUserById(id);
	}

	@Delete("delete/email/:email")
	removeByEmail(@Param("id") email: string) {
		return this.usersService.removeUserByEmail(email);
	}

	@Get("profile_picture/:user_id")
	async getUserProfilePicture(
		@Param("user_id") user_id: string,
		@Res() res: Response
	) {
		try {
			const imageData = await this.usersService.findUserProfilePicture(user_id);

			//   // Convert to PNG format
			//   const image = sharp(imageData.profilePicture)
			//     // .resize(100, 100)
			//     .toFormat("png")
			//     .toBuffer();

			res.set("Content-Type", "application/json");
			res.send({ profilePicture: imageData.profilePicture.toString("base64") });
		} catch {
			throw new HttpException("Image not found", HttpStatus.NOT_FOUND);
		}
	}

	@Patch("update/discord/:id")
	updateDiscord(@Param("id") user_id: string, @Body() discord: any) {
		return this.usersService.updateDiscord(user_id, discord.discord);
	}
}
