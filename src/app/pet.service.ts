import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pet } from './pet';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public getPets(headers: HttpHeaders): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${this.apiUrl}/pet/all`, {headers});
  }

  public addPet(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(`${this.apiUrl}/pet/add`, pet);
  }

  public updatePet(pet: Pet): Observable<Pet> {
    return this.http.put<Pet>(`${this.apiUrl}/pet/update/${pet.id}`, pet);
  }

  public deletePet(petId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/pet/delete/${petId}`);
  }
}
