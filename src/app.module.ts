// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { InstagramStrategy } from './instagram/instagram.strategy';
import { InstagramController } from './instagram/instagram.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PassportModule.register({ defaultStrategy: 'instagram' }),
  ],
  controllers: [InstagramController],
  providers: [InstagramStrategy],
})
export class AppModule {}
