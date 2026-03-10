import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc, addDoc, query, where, getDocs, deleteDoc } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { Observable, from, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
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
        try {
            console.log('ProjectService: Fetching projects from path:', this.projectsPath);
            const projectsRef = collection(this.firestore, this.projectsPath);
            const q = query(projectsRef); // Wrap in query to ensure type compatibility
            return (collectionData(q, { idField: 'id' }) as Observable<Project[]>).pipe(
                tap(data => console.log('ProjectService: Received data from Firestore:', data)),
                catchError(err => {
                    console.error('ProjectService: Error in collectionData pipe:', err);
                    throw err;
                })
            );
        } catch (err) {
            console.error('ProjectService: Sync error in getProjects:', err);
            return of([]); // Return empty if sync error
        }
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

    getStaticProjects(): Project[] {
        return [
            {
                title: 'Metro Commercial Plaza',
                category: 'commercial',
                mainImage: 'assets/images/mechanical.png',
                images: ['assets/images/mechanical.png', 'assets/images/electrical.png', 'assets/images/plumbing.png'],
                location: 'New York, NY',
                services: ['Mechanical', 'Electrical', 'Plumbing'],
                sqft: '250,000 sq ft'
            },
            {
                title: 'City Medical Center',
                category: 'healthcare',
                mainImage: 'assets/images/electrical.png',
                images: ['assets/images/electrical.png', 'assets/images/mechanical.png'],
                location: 'Brooklyn, NY',
                services: ['Full MEP', 'Fire Protection'],
                sqft: '180,000 sq ft'
            },
            {
                title: 'Riverside Office Tower',
                category: 'commercial',
                mainImage: 'assets/images/hero.png',
                images: ['assets/images/hero.png', 'assets/images/mechanical.png'],
                location: 'Jersey City, NJ',
                services: ['Mechanical', 'Electrical'],
                sqft: '320,000 sq ft'
            },
            {
                title: 'Valley School District',
                category: 'education',
                mainImage: 'assets/images/plumbing.png',
                images: ['assets/images/plumbing.png', 'assets/images/sprinkler.png'],
                location: 'Staten Island, NY',
                services: ['Full MEP', 'Fire Alarm'],
                sqft: '120,000 sq ft'
            }
        ];
    }
}
