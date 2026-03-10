import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { AuthService } from '../../services/auth.service';
import { Project } from '../../models/project.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

    // New states for uploads
    mainImageFile: File | null = null;
    galleryFiles: FileList | null = null;
    uploadProgress = 0;

    constructor(
        private projectService: ProjectService,
        private authService: AuthService
    ) {
        // Use an observable that combines static data with live data
        this.projects$ = this.projectService.getProjects().pipe(
            map(live => [...this.projectService.getStaticProjects(), ...live])
        );
    }

    ngOnInit() { }

    openModal() {
        this.showModal = true;
        this.resetForm();
    }

    closeModal() {
        this.showModal = false;
    }

    resetForm() {
        this.mainImageFile = null;
        this.galleryFiles = null;
        this.uploadProgress = 0;
    }

    onMainImageSelected(event: any) {
        this.mainImageFile = event.target.files[0];
    }

    onGallerySelected(event: any) {
        this.galleryFiles = event.target.files;
    }

    async onAddProject(projectData: any) {
        if (!this.mainImageFile) {
            alert('Please select a main image first.');
            return;
        }

        this.isSaving = true;
        try {
            // 1. Upload Main Image
            const mainImageUrl = await this.projectService.uploadFile(this.mainImageFile);

            // 2. Upload Gallery Images (if any)
            const galleryUrls: string[] = [mainImageUrl]; // Start with main image
            if (this.galleryFiles && this.galleryFiles.length > 0) {
                for (let i = 0; i < this.galleryFiles.length; i++) {
                    const url = await this.projectService.uploadFile(this.galleryFiles[i]);
                    galleryUrls.push(url);
                }
            }

            const services = projectData.servicesInput
                ? projectData.servicesInput.split(',').map((s: string) => s.trim())
                : [];

            // 3. Create Project Record
            const newProject: Project = {
                title: projectData.title,
                category: projectData.category,
                mainImage: mainImageUrl,
                images: galleryUrls,
                location: projectData.location,
                sqft: projectData.sqft,
                services: services,
                description: projectData.description || ''
            };

            await this.projectService.addProject(newProject);
            alert('Project added successfully with uploaded images!');
            this.closeModal();
        } catch (err: any) {
            console.error(err);
            alert('Upload Error: ' + err.message);
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
