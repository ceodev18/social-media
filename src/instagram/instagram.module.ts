import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { IgController } from './ig.controller';
import { IgService } from './ig.service';

@Module({
    imports: [
      ConfigModule,
      HttpModule, // Add this line to import the HttpModule
    ],
    controllers: [IgController],
    providers: [IgService],
  })
export class InstagramModule {}
