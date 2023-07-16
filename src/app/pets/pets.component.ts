import { Component, OnInit, ViewChild } from '@angular/core';
import { Pet } from '../pet'
import { PetService } from '../pet.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {
  public pets: Pet[] = [];
  public newPet: Pet = {
    id: 0,
    name: '',
    type: '',
    color: '',
    country: '',
    owner: 0
  };
  public editMode: boolean = false;
  public showSuccessAlert: boolean = false; 

  constructor(private petService: PetService) {}

  

  ngOnInit(){
    this.getPets();
  }

  getPets() {
    const authToken = localStorage.getItem('authToken');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);


    const storedUserId = localStorage.getItem('userId');
    const userId = storedUserId ? parseInt(storedUserId, 10) : null;
  

    this.petService.getPets(headers).subscribe((pets) => {
      this.pets = pets.filter(pet => pet.owner === userId);
    });
  }
  
  @ViewChild('petForm') petForm!: NgForm;

  public addPet(): void {
  
    const storedUserId = localStorage.getItem('userId');
    const userId = storedUserId ? parseInt(storedUserId, 10) : 0;
    this.newPet.owner = userId;
  
    this.petService.addPet(this.newPet).subscribe(
      (response: Pet) => {
        this.pets.push(response);
        this.showSuccessAlert = true;
        this.editMode = false; 
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  
  public hideSuccessAlert(): void {
    this.showSuccessAlert = false;
  }

  editPet(pet: Pet) {
    this.editMode = true;
    this.newPet = { ...pet };
  }
  
  

  addOrUpdatePet() {
    if (this.editMode) {
      this.updatePet();
    } else {
      this.addPet();
    }
    this.editMode = false;
    this.resetNewPet();
  }
  

  updatePet() {
    this.petService.updatePet(this.newPet).subscribe(
      (response: Pet) => {
        
        const editedPetIndex = this.pets.findIndex(pet => pet.id === this.newPet.id);
        
        this.pets[editedPetIndex] = response;
        this.showSuccessAlert = true;
        this.editMode = false; 
        this.getPets();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  resetNewPet(): void {
    this.newPet = {
      id: 0,
      name: '',
      type: '',
      color: '',
      country: '',
      owner: 0
    };
  }
  
  
  
}