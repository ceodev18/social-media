// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { PassportModule } from '@nestjs/passport';
import { InstagramStrategy } from './instagram/instagram.strategy';
import { InstagramController } from './instagram/instagram.controller';
import { IgService } from './instagram/ig.service';
import { IgController } from './instagram/ig.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PassportModule.register({ defaultStrategy: 'instagram' }),
    ConfigModule,
      HttpModule, // Add this line to import the HttpModule
  ],
  controllers: [InstagramController,IgController],
  providers: [InstagramStrategy, IgService],
})
export class AppModule {}
