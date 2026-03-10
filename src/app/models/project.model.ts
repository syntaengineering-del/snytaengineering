export interface Project {
    id?: string;
    title: string;
    category: 'commercial' | 'healthcare' | 'education' | 'residential' | 'industrial' | 'all';
    mainImage: string;
    images: string[]; // List of gallery images
    location: string;
    services: string[];
    sqft: string;
    description?: string;
    completedAt?: Date;
}
