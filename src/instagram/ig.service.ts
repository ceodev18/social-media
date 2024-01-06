/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
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
      code,
    });

    return new Observable((observer) => {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data.toString(),
      })
        .then((response) => response.json())
        .then((json) => {
          observer.next(json as InstagramAuthResponse);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
