import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, switchMap, catchError, tap } from 'rxjs/operators';
import { of, Subject } from 'rxjs';


@Component({
  selector: 'app-reactive-search',
  imports: [ReactiveFormsModule],
  templateUrl: './reactive-search.component.html',
  styleUrl: './reactive-search.component.css'
})
export class ReactiveSearchComponent {
searchControl = new FormControl('');
   apiUrl='https://dummyjson.com/products';
// Data from API
  products: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(private http: HttpClient) {
   this.setupSearch();
  }
   private setupSearch(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        tap(() => {
          this.loading = true;
          this.error = null;
        }),
        switchMap((searchTerm: string | null) => {
          if (!searchTerm || searchTerm.trim() === '') {
            this.products = [];
            this.loading = false;
            return of(null);
          }
          
          const params = { q: searchTerm };
          return this.http.get<any>(this.apiUrl, { params })
            .pipe(
              catchError(err => {
                this.error = 'Failed to fetch data. Please try again.';
                console.error('API Error:', err);
                return of(null);
              })
            );
        })
      )
      .subscribe((response) => {
        this.loading = false;
        if (response && response.products) {
          this.products = response.products;
        } else if (response === null) {
          // Error case handled in catchError
          this.products = [];
        }
      });
  }
}
