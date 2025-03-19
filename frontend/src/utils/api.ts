const BACKEND_DOMAIN = "http://localhost:3000";

export const subscribeReminder = async (data: {
    email?: string;
    phoneNumber?: string;
    platforms: string[];
    reminderTime: number;
    notificationMethod: "email" | "sms";
}) => {
    const response = await fetch(`${BACKEND_DOMAIN}/api/reminder/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Subscription failed");
    const dataResponse = await response.json();
    return dataResponse
}