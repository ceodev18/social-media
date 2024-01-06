import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { IgService } from './ig.service';

@Controller('ig')
export class IgController {
  constructor(private readonly appService: IgService) {}

  @Post('instagram')
  async instagramAuth(
    @Body() { code }: { code: string },
    @Res() response: Response,
  ): Promise<void> {
    try {
      console.log(code);

      // Subscribe to the observable to get the value
      this.appService.exchangeCodeForToken(code).subscribe((authResponse) => {
        console.log(authResponse);
        // Do something with authResponse if needed
        // Redirect to user profile or desired page
        response.redirect('https://beta-frontend-phi.vercel.app/');
      });
    } catch (error) {
      console.error('Instagram authentication error:', error);
      response.status(500).send('Internal Server Error'); // Handle the error gracefully
    }
  }
}
