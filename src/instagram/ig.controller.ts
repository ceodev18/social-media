/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Res } from '@nestjs/common'; // Import Res decorator
import { Response } from 'express'; // Import Response type
import { IgService } from './ig.service';

@Controller('ig')
export class IgController {
  constructor(private readonly appService: IgService) {}

  @Post('instagram')
  async instagramAuth(@Body() { code }: { code: string }, @Res() response: Response): Promise<void> {
    try {
      console.log(code);
      const authResponse = await this.appService.exchangeCodeForToken(code).toPromise();
      console.log(authResponse);
      // Do something with authResponse if needed

      // Redirect to user profile or desired page
      response.redirect('/user-profile');
    } catch (error) {
      console.error('Instagram authentication error:', error);
      response.status(500).send('Internal Server Error'); // Handle the error gracefully
    }
  }
}
