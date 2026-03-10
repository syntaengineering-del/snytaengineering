import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { AuthService } from '../../services/auth.service';
import { Project } from '../../models/project.model';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Component({
    selector: 'app-admin',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './admin.page.html',
    styleUrls: ['./admin.page.scss']
})
export class AdminPageComponent implements OnInit {
    projects$: Observable<Project[]>;
    showModal = false;
    isSaving = false;
    isEditMode = false;
    editingProjectId: string | null = null;

    // Form Model
    projectForm: any = {
        title: '',
        category: 'commercial',
        location: '',
        sqft: '',
        servicesInput: '',
        description: ''
    };

    // States for uploads
    mainImageFile: File | null = null;
    galleryFiles: FileList | null = null;

    constructor(
        private projectService: ProjectService,
        private authService: AuthService
    ) {
        this.projects$ = this.projectService.getProjects().pipe(
            map(live => [...this.projectService.getStaticProjects(), ...live]),
            catchError(err => {
                console.error('Admin Fetch Error:', err);
                return of(this.projectService.getStaticProjects());
            })
        );
    }

    ngOnInit() { }

    openAddModal() {
        this.isEditMode = false;
        this.editingProjectId = null;
        this.resetForm();
        this.showModal = true;
    }

    openEditModal(project: Project) {
        if (!project.id) {
            alert('Cannot edit static projects. Please create a new project to edit it.');
            return;
        }
        this.isEditMode = true;
        this.editingProjectId = project.id;
        this.projectForm = {
            title: project.title,
            category: project.category,
            location: project.location,
            sqft: project.sqft,
            servicesInput: project.services.join(', '),
            description: project.description || ''
        };
        this.mainImageFile = null;
        this.galleryFiles = null;
        this.showModal = true;
    }

    closeModal() {
        this.showModal = false;
    }

    resetForm() {
        this.projectForm = {
            title: '',
            category: 'commercial',
            location: '',
            sqft: '',
            servicesInput: '',
            description: ''
        };
        this.mainImageFile = null;
        this.galleryFiles = null;
    }

    onMainImageSelected(event: any) {
        this.mainImageFile = event.target.files[0];
    }

    onGallerySelected(event: any) {
        this.galleryFiles = event.target.files;
    }

    async onSaveProject() {
        this.isSaving = true;
        try {
            let mainImageUrl = '';
            let galleryUrls: string[] = [];

            // 1. Handle Main Image Upload
            if (this.mainImageFile) {
                mainImageUrl = await this.projectService.uploadFile(this.mainImageFile);
            }

            // 2. Handle Gallery Uploads
            if (this.galleryFiles && this.galleryFiles.length > 0) {
                for (let i = 0; i < this.galleryFiles.length; i++) {
                    const url = await this.projectService.uploadFile(this.galleryFiles[i]);
                    galleryUrls.push(url);
                }
            }

            const services = this.projectForm.servicesInput
                ? this.projectForm.servicesInput.split(',').map((s: string) => s.trim())
                : [];

            const projectData: any = {
                title: this.projectForm.title,
                category: this.projectForm.category,
                location: this.projectForm.location,
                sqft: this.projectForm.sqft,
                services: services,
                description: this.projectForm.description
            };

            if (mainImageUrl) projectData.mainImage = mainImageUrl;
            if (galleryUrls.length > 0) {
                // If we have a new main but no gallery, gallery should at least contain main
                if (galleryUrls.length === 0 && mainImageUrl) galleryUrls = [mainImageUrl];
                projectData.images = galleryUrls;
            }

            if (this.isEditMode && this.editingProjectId) {
                await this.projectService.updateProject(this.editingProjectId, projectData);
                alert('Project updated successfully!');
            } else {
                // Validation for new project
                if (!mainImageUrl) {
                    alert('Main image is required for new projects.');
                    this.isSaving = false;
                    return;
                }
                if (galleryUrls.length === 0) galleryUrls = [mainImageUrl];
                projectData.mainImage = mainImageUrl;
                projectData.images = galleryUrls;

                await this.projectService.addProject(projectData);
                alert('Project added successfully!');
            }

            this.closeModal();
        } catch (err: any) {
            console.error(err);
            alert('Save Error: ' + err.message);
        } finally {
            this.isSaving = false;
        }
    }

    async deleteProject(id: string) {
        if (confirm('Are you sure you want to delete this project?')) {
            try {
                await this.projectService.deleteProject(id);
                alert('Project deleted successfully.');
            } catch (err: any) {
                alert('Error deleting: ' + err.message);
            }
        }
    }

    logout() {
        this.authService.logout();
    }
}
