import { useState } from "react";
import { subscribeReminder } from "../utils/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const platforms = ["Codeforces", "CodeChef", "Leetcode"];

const ReminderForm = () => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [notificationMethod, setNotificationMethod] = useState<"email" | "sms">(
    "email"
  );
  const [contact, setContact] = useState("");
  const [reminderTime, setReminderTime] = useState(30);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
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
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-center">
            Set Contest Reminder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Platforms Selection */}
            <div>
              <Label>Platforms:</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {platforms.map((platform) => (
                  <div key={platform} className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedPlatforms.includes(platform)}
                      onCheckedChange={(checked) => {
                        setSelectedPlatforms((prev) =>
                          checked
                            ? [...prev, platform]
                            : prev.filter((p) => p !== platform)
                        );
                      }}
                    />
                    <Label>{platform}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Notification Method Selection */}
            <div>
              <Label>Notification Method:</Label>
              <RadioGroup
                value={notificationMethod}
                onValueChange={(value) =>
                  setNotificationMethod(value as "email" | "sms")
                }
                className="mt-2"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="email" id="email" />
                  <Label htmlFor="email">Email</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="sms" id="sms" />
                  <Label htmlFor="sms">SMS</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Contact Input */}
            <div>
              <Label>
                {notificationMethod === "email"
                  ? "Email Address:"
                  : "Phone Number:"}
              </Label>
              <Input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
                className="mt-1"
                placeholder={
                  notificationMethod === "email"
                    ? "Enter your email"
                    : "Enter your phone number"
                }
              />
            </div>

            {/* Reminder Time Input */}
            <div>
              <Label>Reminder Time (Minutes before contest):</Label>
              <Input
                type="number"
                value={reminderTime}
                onChange={(e) => setReminderTime(Number(e.target.value))}
                min="1"
                className="mt-1"
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full mt-2" disabled={loading}>
              {loading ? "Setting Reminder..." : "Set Reminder"}
            </Button>

            {/* Message Display */}
            {message && (
              <p
                className={`text-sm mt-2 text-center ${
                  message.includes("success")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReminderForm;
