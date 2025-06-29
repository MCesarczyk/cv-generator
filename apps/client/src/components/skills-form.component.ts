import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Skill } from '../models/cv.model';

@Component({
  selector: 'app-skills-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card fade-in">
      <div class="card-header">
        <h2 class="card-title">Skills</h2>
        <p class="text-gray-500">Add your technical and professional skills</p>
      </div>
      
      <div class="space-y-4">
        <div *ngFor="let skill of skills; let i = index" class="flex gap-4 items-end">
          <div class="form-group flex-1 mb-0">
            <label class="form-label">Skill Name</label>
            <input 
              type="text" 
              class="form-input"
              [(ngModel)]="skill.name"
              (ngModelChange)="onDataChange()"
              placeholder="JavaScript, Project Management, etc.">
          </div>
          
          <div class="form-group flex-1 mb-0">
            <label class="form-label">Proficiency Level</label>
            <select 
              class="form-input"
              [(ngModel)]="skill.level"
              (ngModelChange)="onDataChange()">
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
          
          <button 
            type="button" 
            class="btn btn-danger mb-0"
            (click)="removeSkill(i)"
            *ngIf="skills.length > 1">
            ×
          </button>
        </div>
      </div>
      
      <button 
        type="button" 
        class="btn btn-secondary mt-6"
        (click)="addSkill()">
        Add Another Skill
      </button>
    </div>
  `
})
export class SkillsFormComponent {
  @Input() skills: Skill[] = [{
    name: '',
    level: 'Intermediate'
  }];
  
  @Output() dataChange = new EventEmitter<Skill[]>();
  
  addSkill() {
    this.skills.push({
      name: '',
      level: 'Intermediate'
    });
    this.onDataChange();
  }
  
  removeSkill(index: number) {
    this.skills.splice(index, 1);
    this.onDataChange();
  }
  
  onDataChange() {
    this.dataChange.emit(this.skills);
  }
}