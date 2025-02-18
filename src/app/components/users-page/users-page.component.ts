import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UsersPageService } from './services/users-page.service';
import { FormControl } from '@angular/forms';
import { debounceTime, map, startWith, Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
})
export class UsersPageComponent implements OnInit, OnDestroy {

  private _usersPageService = inject(UsersPageService);
  private _destroy$ = new Subject<void>();
  protected searchControl = new FormControl('');
  protected isLoading$ = this._usersPageService.isLoading$;
  protected hasError$ = this._usersPageService.hasError$;
  protected users$ = this.searchControl.valueChanges.pipe(
    startWith(''),
    debounceTime(100),
    takeUntil(this._destroy$),
    switchMap(() => this._usersPageService.users$),
    map((users) => {
      const searchText = this.searchControl.value?.toLowerCase() ?? '';
      return users.filter(x => 
        x.email?.toLowerCase().includes(searchText) ||
        x.name?.toLowerCase().includes(searchText)
      );
    })
  );

  ngOnInit(): void {
    this._getUsers();
  }

  protected refresh() {
    this._getUsers();
  }

  private _getUsers() {
    this._usersPageService.getUsers();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
