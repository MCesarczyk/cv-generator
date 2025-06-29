import { Component, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PersonalInfoFormComponent } from './components/personal-info-form.component';
import { WorkExperienceFormComponent } from './components/work-experience-form.component';
import { EducationFormComponent } from './components/education-form.component';
import { SkillsFormComponent } from './components/skills-form.component';
import { CvPreviewComponent } from './components/cv-preview.component';
import { PdfService } from './services/pdf.service';
import { CVData, PersonalInfo, WorkExperience, Education, Skill } from './models/cv.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PersonalInfoFormComponent,
    WorkExperienceFormComponent,
    EducationFormComponent,
    SkillsFormComponent,
    CvPreviewComponent
  ],
  providers: [PdfService],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Header -->
      <header class="bg-white shadow-md py-4 mb-8">
        <div class="max-w-6xl mx-auto px-8">
          <h1 class="text-primary-500 text-3xl font-bold mb-0">
            CV Generator
          </h1>
          <p class="text-gray-500 mt-2 mb-0">
            Create a professional CV in minutes
          </p>
        </div>
      </header>

      <div class="max-w-7xl mx-auto px-8">
        <div class="grid-2 gap-12 items-start">
          <!-- Forms Section -->
          <div>
            <app-personal-info-form 
              [personalInfo]="cvData.personalInfo"
              (dataChange)="onPersonalInfoChange($event)">
            </app-personal-info-form>

            <app-work-experience-form 
              [workExperiences]="cvData.workExperience"
              (dataChange)="onWorkExperienceChange($event)">
            </app-work-experience-form>

            <app-education-form 
              [education]="cvData.education"
              (dataChange)="onEducationChange($event)">
            </app-education-form>

            <app-skills-form 
              [skills]="cvData.skills"
              (dataChange)="onSkillsChange($event)">
            </app-skills-form>

            <!-- Action Buttons -->
            <div class="card text-center">
              <h3 class="mb-4 text-gray-800">Ready to Download?</h3>
              <p class="text-gray-500 mb-8">
                Your CV looks great! Click the button below to download it as a PDF.
              </p>
              <div class="flex gap-4 justify-center flex-wrap">
                <button 
                  class="btn btn-success"
                  (click)="downloadPDF()"
                  [disabled]="isGeneratingPDF">
                  {{ isGeneratingPDF ? 'Generating PDF...' : 'Download PDF' }}
                </button>
                <button 
                  class="btn btn-secondary"
                  (click)="clearForm()">
                  Clear All
                </button>
              </div>
            </div>
          </div>

          <!-- Preview Section -->
          <div class="sticky top-8">
            <div class="card">
              <div class="card-header">
                <h2 class="card-title">Live Preview</h2>
                <p class="text-gray-500">See how your CV will look</p>
              </div>
              
              <div class="max-h-[80vh] overflow-y-auto border border-gray-200 rounded-lg">
                <app-cv-preview [cvData]="cvData"></app-cv-preview>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <footer class="mt-16 py-8 bg-white border-t border-gray-200">
        <div class="max-w-6xl mx-auto px-8 text-center">
          <p class="text-gray-500 mb-0">
            Built with Angular • Professional CV Generator
          </p>
        </div>
      </footer>
    </div>
  `
})
export class App implements OnInit {
  cvData: CVData = {
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      website: '',
      summary: ''
    },
    workExperience: [{
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      isCurrentJob: false,
      description: ''
    }],
    education: [{
      degree: '',
      institution: '',
      startDate: '',
      endDate: '',
      isCurrentStudy: false,
      description: ''
    }],
    skills: [{
      name: '',
      level: 'Intermediate'
    }]
  };

  isGeneratingPDF = false;

  constructor(private pdfService: PdfService) {}

  ngOnInit() {
    this.loadSavedData();
  }

  onPersonalInfoChange(personalInfo: PersonalInfo) {
    this.cvData.personalInfo = personalInfo;
    this.saveData();
  }

  onWorkExperienceChange(workExperience: WorkExperience[]) {
    this.cvData.workExperience = workExperience;
    this.saveData();
  }

  onEducationChange(education: Education[]) {
    this.cvData.education = education;
    this.saveData();
  }

  onSkillsChange(skills: Skill[]) {
    this.cvData.skills = skills;
    this.saveData();
  }

  async downloadPDF() {
    this.isGeneratingPDF = true;
    try {
      const filename = this.cvData.personalInfo.fullName 
        ? `${this.cvData.personalInfo.fullName.replace(/\s+/g, '_')}_CV.pdf`
        : 'My_CV.pdf';
      
      await this.pdfService.downloadPDF(this.cvData, filename);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      this.isGeneratingPDF = false;
    }
  }

  clearForm() {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      this.cvData = {
        personalInfo: {
          fullName: '',
          email: '',
          phone: '',
          address: '',
          website: '',
          summary: ''
        },
        workExperience: [{
          jobTitle: '',
          company: '',
          startDate: '',
          endDate: '',
          isCurrentJob: false,
          description: ''
        }],
        education: [{
          degree: '',
          institution: '',
          startDate: '',
          endDate: '',
          isCurrentStudy: false,
          description: ''
        }],
        skills: [{
          name: '',
          level: 'Intermediate'
        }]
      };
      this.saveData();
    }
  }

  private saveData() {
    try {
      localStorage.setItem('cvData', JSON.stringify(this.cvData));
    } catch (error) {
      console.warn('Could not save data to localStorage:', error);
    }
  }

  private loadSavedData() {
    try {
      const savedData = localStorage.getItem('cvData');
      if (savedData) {
        this.cvData = JSON.parse(savedData);
      }
    } catch (error) {
      console.warn('Could not load data from localStorage:', error);
    }
  }
}

bootstrapApplication(App);