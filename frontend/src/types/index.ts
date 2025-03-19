export interface Contest {
    _id: string;
    platform: 'Codeforces' | 'CodeChef' | "Leetcode"; //removed leetcode from here
    name: string;
    startTime: string;
    duration: number;
    url: string;
    isBookmarked?: boolean;
    __v: number;
    solutionUrl: string
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