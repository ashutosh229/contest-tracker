export interface Contest {
    _id: string;
    platform: 'Codeforces' | 'CodeChef'; //removed leetcode from here
    name: string;
    startTime: string;
    duration: number;
    url: string;
    isBookmarked?: boolean;
    __v: number;
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