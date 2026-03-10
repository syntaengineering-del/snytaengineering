import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { AuthService } from '../../services/auth.service';
import { Project } from '../../models/project.model';
import { Observable } from 'rxjs';

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
    isSeeding = false;

    constructor(
        private projectService: ProjectService,
        private authService: AuthService
    ) {
        this.projects$ = this.projectService.getProjects();
    }

    ngOnInit() { }

    openModal() {
        this.showModal = true;
    }

    closeModal() {
        this.showModal = false;
    }

    async onAddProject(projectData: any) {
        try {
            const services = projectData.servicesInput
                ? projectData.servicesInput.split(',').map((s: string) => s.trim())
                : [];

            const newProject: Project = {
                title: projectData.title,
                category: projectData.category,
                mainImage: projectData.mainImage,
                location: projectData.location,
                sqft: projectData.sqft,
                services: services,
                images: [projectData.mainImage]
            };

            await this.projectService.addProject(newProject);
            alert('Project added successfully!');
            this.closeModal();
        } catch (err: any) {
            console.error(err);
            alert('Error: ' + err.message);
        }
    }

    logout() {
        this.authService.logout();
    }
}
