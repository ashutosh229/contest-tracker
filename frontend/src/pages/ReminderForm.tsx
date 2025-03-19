import { useState } from "react";
import { subscribeReminder } from "../utils/api";

const ReminderForm = () => {
  const platforms = ["Codeforces", "CodeChef"];
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [notificationMethod, setNotificationMethod] = useState<"email" | "sms">(
    "email"
  );
  const [contact, setContact] = useState(""); // Email or phone number
  const [reminderTime, setReminderTime] = useState(30); // Default 30 mins
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await subscribeReminder({
        email: notificationMethod === "email" ? contact : undefined,
        phoneNumber: notificationMethod === "sms" ? contact : undefined,
        platforms: selectedPlatforms,
        reminderTime,
        notificationMethod,
      });
      setMessage("Reminder set successfully!");
    } catch (error) {
      setMessage("Failed to set reminder.");
    }
  };

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-lg font-bold">Set Contest Reminder</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Platforms Selection */}
        <label>Platforms:</label>
        <select
          multiple
          onChange={(e) =>
            setSelectedPlatforms(
              [...e.target.selectedOptions].map((o) => o.value)
            )
          }
        >
          {platforms.map((platform) => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
        </select>

        {/* Notification Method Selection */}
        <label>Notification Method:</label>
        <select
          value={notificationMethod}
          onChange={(e) =>
            setNotificationMethod(e.target.value as "email" | "sms")
          }
        >
          <option value="email">Email</option>
          <option value="sms">SMS</option>
        </select>

        {/* Contact Input */}
        <label>
          {notificationMethod === "email" ? "Email:" : "Phone Number:"}
        </label>
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />

        {/* Reminder Time Input */}
        <label>Reminder Time (Minutes before contest):</label>
        <input
          type="number"
          value={reminderTime}
          onChange={(e) => setReminderTime(Number(e.target.value))}
          min="1"
        />

        {/* Submit Button */}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Set Reminder
        </button>

        {/* Message */}
        {message && <p className="text-green-500">{message}</p>}
      </form>
    </div>
  );
};

export default ReminderForm;
