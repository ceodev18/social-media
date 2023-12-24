// src/instagram.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-instagram';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class InstagramStrategy extends PassportStrategy(Strategy, 'instagram') {

  constructor(private readonly configService: ConfigService) {
    super({
      clientID: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
      callbackURL: process.env.INSTAGRAM_CALLBACK_URL,
      scope: 'basic',
      responseType: 'code'
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any): Promise<any> {
    console.log(profile);
    console.log(accessToken);
    console.log(refreshToken);
    // This method will be called after a successful authentication.
    // You can use the information in the `profile` object to create or retrieve a user in your system.
    return profile;
  }
}
