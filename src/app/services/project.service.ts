import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc, addDoc, query, where, getDocs } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    private projectsPath = 'projects';

    constructor(private firestore: Firestore) { }

    // Get all projects
    getProjects(): Observable<Project[]> {
        const projectsRef = collection(this.firestore, this.projectsPath);
        return collectionData(projectsRef, { idField: 'id' }) as Observable<Project[]>;
    }

    // Add a new project
    addProject(project: Project): Promise<any> {
        const projectsRef = collection(this.firestore, this.projectsPath);
        return addDoc(projectsRef, project);
    }

    // Update/Seed initial data if needed
    async seedInitialData(projects: Project[]) {
        const projectsRef = collection(this.firestore, this.projectsPath);
        for (const p of projects) {
            await addDoc(projectsRef, p);
        }
    }
}
