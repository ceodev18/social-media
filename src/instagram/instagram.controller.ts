// src/instagram.controller.ts
import { Controller, Get, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { InstagramStrategy } from './instagram.strategy';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller('instagram')
export class InstagramController {
  constructor(private readonly instagramStrategy: InstagramStrategy) {}

  @Get('login')
  @UseGuards(AuthGuard('instagram'))
  async redirectToInstagram(): Promise<any> {
    console.log('redirectToInstagram called');
    return HttpStatus.OK;
  }

  @Get('callback')
  @UseGuards(AuthGuard('instagram'))
  async callback(@Res() res: Response): Promise<any> {
    // Handle the callback logic if needed
    res.send('Instagram authentication successful!');
  }
}
