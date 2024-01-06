import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { IgService } from './ig.service';
import { InstagramAuthResponse } from './dto/instagram-auth-response';

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
      this.appService.exchangeCodeForToken(code).subscribe(
        (result: InstagramAuthResponse) => {
          // Process the result
          console.log(result);

          // Return a JSON response to the client
          response.json(result);
        },
        (error) => {
          console.error('Instagram authentication error:', error);
          response.status(500).json({ error: 'Internal Server Error' }); // Send a JSON error response
        },
      );
    } catch (error) {
      console.error('Unexpected error:', error);
      response.status(500).json({ error: 'Internal Server Error' }); // Send a JSON error response
    }
  }
}
