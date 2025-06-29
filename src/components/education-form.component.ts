import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Education } from '../models/cv.model';

@Component({
  selector: 'app-education-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card fade-in">
      <div class="card-header">
        <h2 class="card-title">Education</h2>
        <p class="text-gray-500">Add your educational background</p>
      </div>
      
      <div *ngFor="let edu of education; let i = index" class="bg-slate-50 rounded-xl p-6 mb-4">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-primary-500 text-lg font-semibold mb-0">Education {{i + 1}}</h3>
          <button 
            type="button" 
            class="btn btn-danger"
            (click)="removeEducation(i)"
            *ngIf="education.length > 1">
            Remove
          </button>
        </div>
        
        <div class="grid-2">
          <div class="form-group">
            <label class="form-label">Degree</label>
            <input 
              type="text" 
              class="form-input"
              [(ngModel)]="edu.degree"
              (ngModelChange)="onDataChange()"
              placeholder="Bachelor of Science in Computer Science">
          </div>
          
          <div class="form-group">
            <label class="form-label">Institution</label>
            <input 
              type="text" 
              class="form-input"
              [(ngModel)]="edu.institution"
              (ngModelChange)="onDataChange()"
              placeholder="University of Technology">
          </div>
        </div>
        
        <div class="grid-2">
          <div class="form-group">
            <label class="form-label">Start Date</label>
            <input 
              type="month" 
              class="form-input"
              [(ngModel)]="edu.startDate"
              (ngModelChange)="onDataChange()">
          </div>
          
          <div class="form-group">
            <label class="form-label">End Date</label>
            <input 
              type="month" 
              class="form-input"
              [(ngModel)]="edu.endDate"
              (ngModelChange)="onDataChange()"
              [disabled]="edu.isCurrentStudy">
            <div class="mt-2">
              <label class="flex items-center gap-2 font-normal">
                <input 
                  type="checkbox"
                  [(ngModel)]="edu.isCurrentStudy"
                  (ngModelChange)="onCurrentStudyChange(edu)">
                Currently studying
              </label>
            </div>
          </div>
        </div>
        
        <div class="form-group">
          <label class="form-label">Description (Optional)</label>
          <textarea 
            class="form-input form-textarea"
            [(ngModel)]="edu.description"
            (ngModelChange)="onDataChange()"
            placeholder="Relevant coursework, achievements, GPA, etc."></textarea>
        </div>
      </div>
      
      <button 
        type="button" 
        class="btn btn-secondary"
        (click)="addEducation()">
        Add Another Education
      </button>
    </div>
  `
})
export class EducationFormComponent {
  @Input() education: Education[] = [{
    degree: '',
    institution: '',
    startDate: '',
    endDate: '',
    isCurrentStudy: false,
    description: ''
  }];
  
  @Output() dataChange = new EventEmitter<Education[]>();
  
  addEducation() {
    this.education.push({
      degree: '',
      institution: '',
      startDate: '',
      endDate: '',
      isCurrentStudy: false,
      description: ''
    });
    this.onDataChange();
  }
  
  removeEducation(index: number) {
    this.education.splice(index, 1);
    this.onDataChange();
  }
  
  onCurrentStudyChange(edu: Education) {
    if (edu.isCurrentStudy) {
      edu.endDate = '';
    }
    this.onDataChange();
  }
  
  onDataChange() {
    this.dataChange.emit(this.education);
  }
}