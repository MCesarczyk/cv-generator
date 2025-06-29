import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CVData } from '../models/cv.model';

@Component({
  selector: 'app-cv-preview',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cv-preview" id="cv-preview">
      <!-- Header Section -->
      <div class="cv-header">
        <h1 class="cv-name">{{ cvData.personalInfo.fullName || 'Your Name' }}</h1>
        <div class="cv-contact">
          <span *ngIf="cvData.personalInfo.email">{{ cvData.personalInfo.email }}</span>
          <span *ngIf="cvData.personalInfo.phone">{{ cvData.personalInfo.phone }}</span>
          <span *ngIf="cvData.personalInfo.address">{{ cvData.personalInfo.address }}</span>
          <span *ngIf="cvData.personalInfo.website">{{ cvData.personalInfo.website }}</span>
        </div>
      </div>

      <!-- Professional Summary -->
      <div class="cv-section" *ngIf="cvData.personalInfo.summary">
        <h2 class="cv-section-title">Professional Summary</h2>
        <p>{{ cvData.personalInfo.summary }}</p>
      </div>

      <!-- Work Experience -->
      <div class="cv-section" *ngIf="cvData.workExperience.length > 0 && hasValidWorkExperience()">
        <h2 class="cv-section-title">Work Experience</h2>
        <div *ngFor="let exp of cvData.workExperience" class="cv-item">
          <div class="cv-item-header" *ngIf="exp.jobTitle || exp.company">
            <div>
              <div class="cv-item-title" *ngIf="exp.jobTitle">{{ exp.jobTitle }}</div>
              <div class="cv-item-company" *ngIf="exp.company">{{ exp.company }}</div>
            </div>
            <div class="cv-item-date" *ngIf="exp.startDate">
              {{ formatDate(exp.startDate) }} - {{ exp.isCurrentJob ? 'Present' : formatDate(exp.endDate) }}
            </div>
          </div>
          <div class="cv-item-description" *ngIf="exp.description">{{ exp.description }}</div>
        </div>
      </div>

      <!-- Education -->
      <div class="cv-section" *ngIf="cvData.education.length > 0 && hasValidEducation()">
        <h2 class="cv-section-title">Education</h2>
        <div *ngFor="let edu of cvData.education" class="cv-item">
          <div class="cv-item-header" *ngIf="edu.degree || edu.institution">
            <div>
              <div class="cv-item-title" *ngIf="edu.degree">{{ edu.degree }}</div>
              <div class="cv-item-company" *ngIf="edu.institution">{{ edu.institution }}</div>
            </div>
            <div class="cv-item-date" *ngIf="edu.startDate">
              {{ formatDate(edu.startDate) }} - {{ edu.isCurrentStudy ? 'Present' : formatDate(edu.endDate) }}
            </div>
          </div>
          <div class="cv-item-description" *ngIf="edu.description">{{ edu.description }}</div>
        </div>
      </div>

      <!-- Skills -->
      <div class="cv-section" *ngIf="cvData.skills.length > 0 && hasValidSkills()">
        <h2 class="cv-section-title">Skills</h2>
        <div class="skills-grid">
          <ng-container *ngFor="let skill of cvData.skills">
            <div class="skill-item" *ngIf="skill.name">
              <span class="skill-name">{{ skill.name }}</span>
              <span class="skill-level">{{ skill.level }}</span>
            </div>
          </ng-container>
        </div>
      </div>
    </div>
  `
})
export class CvPreviewComponent {
  @Input() cvData: CVData = {
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      website: '',
      summary: ''
    },
    workExperience: [],
    education: [],
    skills: []
  };

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const [year, month] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  }

  hasValidWorkExperience(): boolean {
    return this.cvData.workExperience.some(exp => 
      exp.jobTitle.trim() || exp.company.trim() || exp.description.trim()
    );
  }

  hasValidEducation(): boolean {
    return this.cvData.education.some(edu => 
      edu.degree.trim() || edu.institution.trim() || edu.description?.trim()
    );
  }

  hasValidSkills(): boolean {
    return this.cvData.skills.some(skill => skill.name.trim());
  }
}