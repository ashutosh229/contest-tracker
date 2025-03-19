import { useState, useEffect } from "react";
import { fetchReminders } from "../utils/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

const ReminderList = () => {
  const [reminders, setReminders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReminders()
      .then((data) => {
        setReminders(data.data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-center">
            Your Reminders
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
            </div>
          ) : reminders.length > 0 ? (
            <ul className="space-y-3">
              {reminders.map((reminder) => (
                <li
                  key={reminder._id}
                  className="border p-3 rounded-lg bg-white shadow-sm flex flex-wrap gap-2"
                >
                  <Badge variant="outline">
                    📢 {reminder.platforms.join(", ")}
                  </Badge>
                  <Badge variant="secondary">
                    ⏰ {reminder.reminderTime} mins before
                  </Badge>
                  <Badge variant="destructive">
                    📩 {reminder.notificationMethod.toUpperCase()}
                  </Badge>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">No reminders set.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReminderList;
