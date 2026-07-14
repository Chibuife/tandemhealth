import { FileText, FlaskConical, Image as ImageIcon, ArrowUpRight, LucideIcon } from 'lucide-react';
import { PatientRecentUpload, PatientDocumentType } from '@/types/patient';

const TYPE_STYLES: Record<PatientDocumentType, { icon: LucideIcon; iconBg: string; iconColor: string }> = {
  'Clinical note': { icon: FileText, iconBg: 'bg-red-50', iconColor: 'text-red-500' },
  'Lab results': { icon: FlaskConical, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600' },
  Imaging: { icon: ImageIcon, iconBg: 'bg-blue-50', iconColor: 'text-blue-600' },
  Referral: { icon: ArrowUpRight, iconBg: 'bg-orange-50', iconColor: 'text-orange-500' },
  Report: { icon: FileText, iconBg: 'bg-violet-50', iconColor: 'text-violet-600' },
  Form: { icon: FileText, iconBg: 'bg-red-50', iconColor: 'text-red-500' },
  Other: { icon: FileText, iconBg: 'bg-slate-100', iconColor: 'text-slate-600' },
};

interface RecentUploadsCardProps {
  uploads: PatientRecentUpload[];
}

export function RecentUploadsCard({ uploads }: RecentUploadsCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-semibold text-fg">Recent uploads</h3>
        <button className="text-sm font-medium text-emerald-700 hover:underline">View all</button>
      </div>

      <ul className="mb-3">
        {uploads.map((upload) => {
          const style = TYPE_STYLES[upload.type];
          const Icon = style.icon;
          return (
            <li key={upload.id} className="flex items-start gap-3 border-t border-border py-3 first:border-0">
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${style.iconBg}`}>
                <Icon className={`h-4 w-4 ${style.iconColor}`} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-fg">{upload.name}</p>
                <p className="text-xs text-muted-foreground">{upload.date}</p>
              </div>
              {upload.unread && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />}
            </li>
          );
        })}
      </ul>

      <button className="w-full rounded-lg border border-border px-3 py-2 text-sm font-medium text-fg hover:bg-muted">
        Go to all documents
      </button>
    </div>
  );
}

export default RecentUploadsCard;