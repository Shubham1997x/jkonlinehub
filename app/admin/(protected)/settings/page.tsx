import { AdminHeader } from "@/components/admin/AdminHeader";
import { getSettings } from "@/lib/actions/settings";
import { SettingsForm } from "./SettingsForm";

export default async function SettingsPage() {
  const settings = await getSettings();
  const socialLinks = JSON.parse(settings.socialLinks || "{}");

  return (
    <>
      <AdminHeader title="Settings" />
      <div className="flex-1 p-4 sm:p-6">
        <SettingsForm settings={settings} socialLinks={socialLinks} />
      </div>
    </>
  );
}
