import { inject, Injectable } from '@angular/core';
import { Product } from '../models/products';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { concatAll, concatMap, forkJoin, from, map, mergeMap, Observable, toArray } from 'rxjs';
import { StrictUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  #http = inject(HttpClient);

  constructor() { }

  getUsersByName(product: Product):Observable<(StrictUser | undefined)[]> {
    
    const nameEmailList = product.reviews.map((review) => {
      return {
        name: review.reviewerName.split(' ')[0],
        email: review.reviewerEmail,
      };
    });
    const uniqNames = new Set<string>();
    nameEmailList.forEach((name) => uniqNames.add(name.name));

    return from(uniqNames)
      .pipe(
        mergeMap((name) => {
          return this.#http.get<{ limit: number; skip: number; total: number; users: StrictUser[] }>
          (`${environment.usersApi}/search?q=${name}`)
            .pipe(
              map((response: { limit: number; skip: number; total: number; users: StrictUser[] }) => {
                return response.users.find((user)=>{
                  return nameEmailList.find(nameEmail => nameEmail.email === user.email) ? user : null;
                })
              })
            );
        }),
        toArray()
      );
  }
}
