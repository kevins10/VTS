import { Controller, Get, Redirect } from "@nestjs/common";

@Controller()
export class AppController {
  constructor() {}

  // Automatically redirect to API
  @Get()
  @Redirect("http://localhost:3000/api")
  redirectToAPI(): void {}
}
