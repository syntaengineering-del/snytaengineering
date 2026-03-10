import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface Reason {
    iconHtml: SafeHtml;
    title: string;
    description: string;
}

@Component({
    selector: 'app-why-choose-us',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './why-choose-us.component.html',
    styleUrls: ['./why-choose-us.component.scss']
})
export class WhyChooseUsComponent {
    reasons: Reason[];

    constructor(private sanitizer: DomSanitizer) {
        const rawReasons = [
            {
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"></path></svg>`,
                title: 'Industry Expertise',
                description: 'Over 15 years of MEP engineering experience across commercial, healthcare, education, and residential sectors.'
            },
            {
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
                title: 'Energy Efficiency',
                description: 'We design systems that minimize energy consumption and maximize sustainability through advanced modeling.'
            },
            {
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
                title: 'Code Compliance',
                description: 'Every design meets or exceeds local, state, and federal building codes and NFPA standards.'
            },
            {
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 00-3-3.87"></path><path d="M16 3.13a4 4 0 010 7.75"></path></svg>`,
                title: 'Collaborative Approach',
                description: 'We work closely with architects, contractors, and owners to deliver integrated design solutions.'
            },
            {
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"></path></svg>`,
                title: 'Full-Service MEP',
                description: 'From concept design through construction administration, we provide end-to-end engineering services.'
            },
            {
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>`,
                title: 'Proven Track Record',
                description: 'Over 500 successful projects delivered on time and within budget across multiple market sectors.'
            }
        ];

        this.reasons = rawReasons.map(r => ({
            iconHtml: this.sanitizer.bypassSecurityTrustHtml(r.icon),
            title: r.title,
            description: r.description
        }));
    }
}
