import { AdminHeader } from "@/components/admin/AdminHeader";
import { listMedia } from "@/lib/actions/media";
import { MediaGrid } from "./MediaGrid";

export default async function MediaPage() {
  const media = await listMedia();

  return (
    <>
      <AdminHeader title="Media Library" />
      <div className="flex-1 space-y-4 p-4 sm:p-6">
        <MediaGrid items={media} />
      </div>
    </>
  );
}
