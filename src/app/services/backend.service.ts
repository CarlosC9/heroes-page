import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {delay, map, skip, take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private readonly HEROES_API = 'https://akabab.github.io/superhero-api/api/'
  private readonly httpClient = inject(HttpClient)

  getHeroes({pageIndex, pageSize, name}: {pageIndex: number, pageSize: number, name?: string}) {
    return this.httpClient.get<any[]>(`${this.HEROES_API}/all.json`).pipe(
      map( (response) =>  {
        let dataMap = response
        if (name) dataMap = response.filter((item) => {
          const itemName: string = item.name
          return itemName.toLowerCase().includes(name.toLowerCase()) // search by name
        })
        let totalItems = dataMap.length
        const start = pageIndex * pageSize
        const end = start + pageSize
        dataMap = dataMap.slice(start, end) // For test pagination
        dataMap = dataMap.map(item => {
          return {...item, name: item.name.toLowerCase()} // Lower Case Name Heroes for test pipe firstLetterUpperCase
        })
        return {data: dataMap, totalItems}
      }),
      delay(1000) // Delay for test loader
    )
  }

  getHeroById(id: number) {
    return this.httpClient.get<any[]>(`${this.HEROES_API}/all.json`).pipe(
      map(response => {
        return response.find(item => item.id == id)
      }),
      delay(1000)
    )
  }
}
