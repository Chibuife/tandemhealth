import { Plus } from "lucide-react";

const TAG_COLORS = [
  "bg-violet-100 text-violet-700",
  "bg-amber-100 text-amber-700",
  "bg-rose-100 text-rose-700",
  "bg-blue-100 text-blue-700",
  "bg-emerald-100 text-emerald-700",
];

interface PatientTagsCardProps {
  tags: string[];
  onEditTags?: () => void;
  onAddTag?: () => void;
}

export default function PatientTagsCard({ tags, onEditTags, onAddTag }: PatientTagsCardProps) {
  return (
    <div className="mt-4 rounded-2xl border border-border bg-white p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-fg">Tags</h3>
        <button
          type="button"
          onClick={onEditTags}
          className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-fg hover:bg-bg-subtle"
        >
          Edit tags
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={tag}
            className={`rounded-full px-3 py-1 text-xs font-medium ${TAG_COLORS[index % TAG_COLORS.length]}`}
          >
            {tag}
          </span>
        ))}

        <button
          type="button"
          onClick={onAddTag}
          className="flex items-center gap-1 rounded-full border border-dashed border-border px-3 py-1 text-xs font-medium text-fg-muted hover:bg-bg-subtle"
        >
          <Plus className="h-3 w-3" />
          Add tag
        </button>
      </div>
    </div>
  );
}