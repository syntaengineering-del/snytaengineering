import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface Value {
    iconHtml: SafeHtml;
    title: string;
    description: string;
}

interface TeamMember {
    name: string;
    role: string;
    initials: string;
    bio: string;
    image?: string;
}

@Component({
    selector: 'app-about-page',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './about.page.html',
    styleUrls: ['./about.page.scss']
})
export class AboutPageComponent {
    values: Value[];

    team: TeamMember[] = [
        {
            name: 'Syed Bilal Ali',
            role: 'Principal Engineer & CEO',
            initials: 'SBA',
            bio: 'Over 20 years of experience in MEP engineering with a focus on sustainable design and energy-efficient building systems.'
        },
        {
            name: 'Tamer Luka, FP.E.',
            role: 'Senior F/MEP Engineer',
            initials: 'TL',
            image: 'assets/images/tamer.jpeg',
            bio: 'A proactive professional with over a decade of experience in FMEP engineering, specialized in Fire Protection, HVAC, and Plumbing system design. Licensed Professional Engineer (Mechanical & Fire Protection).'
        }
    ];

    stats = [
        { value: '150+', label: 'Projects Completed' },
        { value: '15+', label: 'Team Members' },
        { value: '25+', label: 'Years Experience' },
        { value: '8', label: 'Market Sectors' }
    ];

    constructor(private sanitizer: DomSanitizer) {
        const rawValues = [
            {
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>`,
                title: 'Excellence',
                description: 'We pursue the highest standards of engineering quality in every project we undertake.'
            },
            {
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
                title: 'Integrity',
                description: 'We build lasting relationships through transparency, honesty, and ethical business practices.'
            },
            {
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
                title: 'Innovation',
                description: 'We embrace new technologies and methodologies to deliver cutting-edge engineering solutions.'
            },
            {
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 00-3-3.87"></path><path d="M16 3.13a4 4 0 010 7.75"></path></svg>`,
                title: 'Collaboration',
                description: 'We work as an integrated team with architects, contractors, and owners to achieve shared project goals.'
            }
        ];

        this.values = rawValues.map(v => ({
            iconHtml: this.sanitizer.bypassSecurityTrustHtml(v.icon),
            title: v.title,
            description: v.description
        }));
    }
}
