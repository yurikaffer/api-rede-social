import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";

@Controller('api/v1/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Req() req: any) {
        return await this.authService.login(req.user)
    }
}