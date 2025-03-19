import { useState, useEffect } from "react";
import { fetchReminders } from "../utils/api";

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
    <div className="p-4 border rounded shadow">
      <h2 className="text-lg font-bold">Your Reminders</h2>
      {loading ? (
        <p>Loading reminders...</p>
      ) : reminders.length > 0 ? (
        <ul>
          {reminders.map((reminder) => (
            <li key={reminder._id}>
              <p>📢 Platform: {reminder.platforms.join(", ")}</p>
              <p>⏰ Time: {reminder.reminderTime} minutes before</p>
              <p>📩 Method: {reminder.notificationMethod}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reminders set.</p>
      )}
    </div>
  );
};

export default ReminderList;
