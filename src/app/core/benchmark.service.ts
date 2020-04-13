import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Data} from './model/data';
import {environment} from '../../environments/environment';

const baseUrl = environment.url + '/api/v1';

@Injectable({
  providedIn: 'root'
})
export class BenchmarkService {

  constructor(private HTTP_CLIENT: HttpClient) {
  }

  uploadFile(file: File): Observable<Data[]> {

    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.HTTP_CLIENT.post<Data[]>(baseUrl + '/benchmark', formData);
  }

  isAwake(): Observable<boolean> {
    return this.HTTP_CLIENT.get<boolean>(baseUrl + '/awake');
  }
}
