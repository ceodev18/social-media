/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface InstagramAuthResponse {
  access_token: string;
  user: {
    id: string;
    username: string;
    // ...other user data
  };
}

@Injectable()
export class IgService {
  constructor(private httpService: HttpService) {}

  getHello(): string {
    return 'Hello World!';
  }

  exchangeCodeForToken(code: string): Observable<InstagramAuthResponse> {
    const url = 'https://api.instagram.com/oauth/access_token';
    const data = new URLSearchParams({
      client_id: '363680826135832',
      client_secret: 'a08db3a38b4522f15264a2ce72165e5c',
      grant_type: 'authorization_code',
      redirect_uri: 'https://beta-frontend-phi.vercel.app/',
      code,
    });
    return this.httpService.post(url, data.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      transformRequest: [(data) => data], // Keep the data as is (URLSearchParams)
    }).pipe(
      map((response) => response.data as InstagramAuthResponse)
    );
  }
}
