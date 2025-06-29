import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PersonalInfo } from '../models/cv.model';

@Component({
  selector: 'app-personal-info-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card fade-in">
      <div class="card-header">
        <h2 class="card-title">Personal Information</h2>
        <p class="text-gray-500">Let's start with your basic information</p>
      </div>
      
      <div class="grid-2">
        <div class="form-group">
          <label class="form-label">Full Name</label>
          <input 
            type="text" 
            class="form-input"
            [(ngModel)]="personalInfo.fullName"
            (ngModelChange)="onDataChange()"
            placeholder="John Doe"
            required>
        </div>
        
        <div class="form-group">
          <label class="form-label">Email</label>
          <input 
            type="email" 
            class="form-input"
            [(ngModel)]="personalInfo.email"
            (ngModelChange)="onDataChange()"
            placeholder="john.doe@email.com"
            required>
        </div>
      </div>
      
      <div class="grid-2">
        <div class="form-group">
          <label class="form-label">Phone</label>
          <input 
            type="tel" 
            class="form-input"
            [(ngModel)]="personalInfo.phone"
            (ngModelChange)="onDataChange()"
            placeholder="+1 (555) 123-4567">
        </div>
        
        <div class="form-group">
          <label class="form-label">Website (Optional)</label>
          <input 
            type="url" 
            class="form-input"
            [(ngModel)]="personalInfo.website"
            (ngModelChange)="onDataChange()"
            placeholder="https://johndoe.com">
        </div>
      </div>
      
      <div class="form-group">
        <label class="form-label">Address</label>
        <input 
          type="text" 
          class="form-input"
          [(ngModel)]="personalInfo.address"
          (ngModelChange)="onDataChange()"
          placeholder="123 Main St, City, State, ZIP">
      </div>
      
      <div class="form-group">
        <label class="form-label">Professional Summary</label>
        <textarea 
          class="form-input form-textarea"
          [(ngModel)]="personalInfo.summary"
          (ngModelChange)="onDataChange()"
          placeholder="Write a brief professional summary that highlights your key skills and experience..."></textarea>
      </div>
    </div>
  `
})
export class PersonalInfoFormComponent {
  @Input() personalInfo: PersonalInfo = {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    summary: ''
  };
  
  @Output() dataChange = new EventEmitter<PersonalInfo>();
  
  onDataChange() {
    this.dataChange.emit(this.personalInfo);
  }
}