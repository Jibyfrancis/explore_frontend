import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/enviroments/environment';

export interface MapboxOutput {
  attribution: string;
  features: Feature[];
  query: [];
}

export interface Feature {
  place_name: string;
  geometry:any
}

@Injectable({
  providedIn: 'root'
})
export class MapboxServiceService {

  constructor(private _http: HttpClient,) { }

  search_word(query: string) {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    return this._http.get(url + query + '.json?&access_token='+ environment.mapbox.accessToken)
    .pipe(map((res: any) => {
      // console.log(res.features[0]);
      return res.features;
    }));
  }
  
}
