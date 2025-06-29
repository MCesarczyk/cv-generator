import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WorkExperience } from '../models/cv.model';

@Component({
  selector: 'app-work-experience-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card fade-in">
      <div class="card-header">
        <h2 class="card-title">Work Experience</h2>
        <p class="text-gray-500">Add your professional experience</p>
      </div>
      
      <div *ngFor="let experience of workExperiences; let i = index" class="bg-slate-50 rounded-xl p-6 mb-4">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-primary-500 text-lg font-semibold mb-0">Experience {{i + 1}}</h3>
          <button 
            type="button" 
            class="btn btn-danger"
            (click)="removeExperience(i)"
            *ngIf="workExperiences.length > 1">
            Remove
          </button>
        </div>
        
        <div class="grid-2">
          <div class="form-group">
            <label class="form-label">Job Title</label>
            <input 
              type="text" 
              class="form-input"
              [(ngModel)]="experience.jobTitle"
              (ngModelChange)="onDataChange()"
              placeholder="Software Developer">
          </div>
          
          <div class="form-group">
            <label class="form-label">Company</label>
            <input 
              type="text" 
              class="form-input"
              [(ngModel)]="experience.company"
              (ngModelChange)="onDataChange()"
              placeholder="Tech Company Inc.">
          </div>
        </div>
        
        <div class="grid-2">
          <div class="form-group">
            <label class="form-label">Start Date</label>
            <input 
              type="month" 
              class="form-input"
              [(ngModel)]="experience.startDate"
              (ngModelChange)="onDataChange()">
          </div>
          
          <div class="form-group">
            <label class="form-label">End Date</label>
            <input 
              type="month" 
              class="form-input"
              [(ngModel)]="experience.endDate"
              (ngModelChange)="onDataChange()"
              [disabled]="experience.isCurrentJob">
            <div class="mt-2">
              <label class="flex items-center gap-2 font-normal">
                <input 
                  type="checkbox"
                  [(ngModel)]="experience.isCurrentJob"
                  (ngModelChange)="onCurrentJobChange(experience)">
                Currently working here
              </label>
            </div>
          </div>
        </div>
        
        <div class="form-group">
          <label class="form-label">Job Description</label>
          <textarea 
            class="form-input form-textarea"
            [(ngModel)]="experience.description"
            (ngModelChange)="onDataChange()"
            placeholder="Describe your responsibilities and achievements..."></textarea>
        </div>
      </div>
      
      <button 
        type="button" 
        class="btn btn-secondary"
        (click)="addExperience()">
        Add Another Experience
      </button>
    </div>
  `
})
export class WorkExperienceFormComponent {
  @Input() workExperiences: WorkExperience[] = [{
    jobTitle: '',
    company: '',
    startDate: '',
    endDate: '',
    isCurrentJob: false,
    description: ''
  }];
  
  @Output() dataChange = new EventEmitter<WorkExperience[]>();
  
  addExperience() {
    this.workExperiences.push({
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      isCurrentJob: false,
      description: ''
    });
    this.onDataChange();
  }
  
  removeExperience(index: number) {
    this.workExperiences.splice(index, 1);
    this.onDataChange();
  }
  
  onCurrentJobChange(experience: WorkExperience) {
    if (experience.isCurrentJob) {
      experience.endDate = '';
    }
    this.onDataChange();
  }
  
  onDataChange() {
    this.dataChange.emit(this.workExperiences);
  }
}