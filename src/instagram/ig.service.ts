// ig.service.ts
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Observable, Observer } from 'rxjs';
import { InstagramAuthResponse } from './dto/instagram-auth-response';

@Injectable()
export class IgService {
  constructor() {}

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
      code: code,
    });

    return new Observable((observer: Observer<InstagramAuthResponse>) => {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data.toString(),
      })
        .then(async (response) => {
          if (!response.ok) {
            throw new Error(`Instagram API error: ${response.status} - ${await response.text()}`);
          }
          return response.json();
        })
        .then((json) => {
          console.log(json);
          observer.next(json as InstagramAuthResponse);
          observer.complete();
        })
        .catch((error) => {
          console.error('Instagram authentication error:', error);
          observer.error(error);
        });
    });
  }
}