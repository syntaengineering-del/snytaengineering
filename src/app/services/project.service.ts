import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc, addDoc, query, where, getDocs, deleteDoc } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { Observable, from } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    private projectsPath = 'projects';

    constructor(
        private firestore: Firestore,
        private storage: Storage
    ) { }

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

    // Upload a single file and return URL
    async uploadFile(file: File, folder: string = 'projects'): Promise<string> {
        const filePath = `${folder}/${Date.now()}_${file.name}`;
        const storageRef = ref(this.storage, filePath);
        const snapshot = await uploadBytes(storageRef, file);
        return await getDownloadURL(snapshot.ref);
    }

    // Delete project
    deleteProject(id: string) {
        const docRef = doc(this.firestore, `${this.projectsPath}/${id}`);
        return deleteDoc(docRef);
    }

    // Seed initial data
    async seedInitialData(projects: Project[]) {
        const projectsRef = collection(this.firestore, this.projectsPath);
        for (const p of projects) {
            await addDoc(projectsRef, p);
        }
    }
}
