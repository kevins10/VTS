import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JWT_SECRET } from "../secrets";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return {
      user_id: payload.user_id,

      username: payload.username,
      first_name: payload.first_name,
      last_name: payload.last_name,
      riot_name: payload.riot_name,
      riot_tag: payload.riot_tag,
      user_type: payload.user_type,
    };
  }
}
