export interface Contest {
    id: string;
    platform: 'Codeforces' | 'CodeChef'; //removed leetcode from here
    name: string;
    startTime: string;
    duration: number;
    url: string;
    solutionUrl?: string;
    isBookmarked?: boolean;
}

export interface User {
    id: string;
    email: string;
    preferences: {
        platforms: string[];
        reminderTiming: number[];
        reminderType: ('email' | 'sms')[];
    };
}