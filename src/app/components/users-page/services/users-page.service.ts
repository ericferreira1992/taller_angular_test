import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map , tap } from 'rxjs';
import { User } from '../models/user.model';

const BASE_API_URL = `https://jsonplaceholder.typicode.com`;

export enum HttpDataFetchStatus {
  PENGING,
  SUCCESS,
  ERROR
}

@Injectable({ providedIn: 'root' })
export class UsersPageService {
  private _httpClient = inject(HttpClient);

  private _users$ = new BehaviorSubject<User[]>([]);
  public users$ = this._users$.asObservable();

  private _status$ = new BehaviorSubject(HttpDataFetchStatus.PENGING);
  public isLoading$ = this._status$.asObservable().pipe(
    map((status) => status === HttpDataFetchStatus.PENGING)
  );
  public hasError$ = this._status$.asObservable().pipe(
    map((status) => status === HttpDataFetchStatus.ERROR)
  );

  public getUsers() {
    this._status$.next(HttpDataFetchStatus.PENGING);
    return this._httpClient.get<User[]>(`${BASE_API_URL}/users`).pipe(
      tap((users) => {
        this._status$.next(HttpDataFetchStatus.SUCCESS);
        this._users$.next(users);
      }),
      catchError((error) => {
        this._status$.next(HttpDataFetchStatus.ERROR);
        return error;
      }),
    ).subscribe();
  }
}
