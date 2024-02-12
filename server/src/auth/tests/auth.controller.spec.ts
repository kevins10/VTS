import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "../auth.controller";
import { AuthService } from "../auth.service";
import { JwtAuthGuard } from "../passport/jwt-auth.guard";
import { MockAuthGuard } from "./mock-Auth.guard";
import { ModuleMocker, MockFunctionMetadata } from "jest-mock";
import { AppModule } from "src/app.module";
import { UsersService } from "src/users/users.service";

const supertest = require("supertest");

const moduleMocker = new ModuleMocker(global);

describe("AuthController", () => {
	let authController: AuthController;
	let authService: AuthService;
	let usersService: UsersService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
			controllers: [AuthController],
			providers: [AuthService],
		})
			.overrideProvider(JwtAuthGuard)
			.useClass(MockAuthGuard)
			.useMocker((token) => {
				const results = ["test1", "test2"];
				if (token === AuthService) {
					return { findAll: jest.fn().mockResolvedValue(results) };
				}

				if (typeof token === "function") {
					const mockMetadata = moduleMocker.getMetadata(
						token
					) as MockFunctionMetadata<any, any>;
					const Mock = moduleMocker.generateFromMetadata(mockMetadata);
					return new Mock();
			})
			.compile();

		authController = module.get<AuthController>(AuthController);
	});

	test("Login with the wrong password should fail", () => {});
	test("Retrieving user data without JWT credentials should fail", () => {});

	it("should be defined", () => {
		expect(authController).toBeDefined();
	});
});
