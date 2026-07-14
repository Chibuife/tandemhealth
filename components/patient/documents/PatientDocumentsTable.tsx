'use client';

import { useState } from 'react';
import {
  FileText,
  FlaskConical,
  Image as ImageIcon,
  ArrowUpRight,
  Eye,
  Download,
  MoreHorizontal,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  LucideIcon,
} from 'lucide-react';
import { PatientDocument, PatientDocumentType } from '@/types/patient';

const TYPE_STYLES: Record<PatientDocumentType, { icon: LucideIcon; iconBg: string; iconColor: string; badge: string }> = {
  'Clinical note': { icon: FileText, iconBg: 'bg-red-50', iconColor: 'text-red-500', badge: 'bg-violet-50 text-violet-700' },
  'Lab results': { icon: FlaskConical, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', badge: 'bg-emerald-50 text-emerald-700' },
  Imaging: { icon: ImageIcon, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', badge: 'bg-blue-50 text-blue-700' },
  Referral: { icon: ArrowUpRight, iconBg: 'bg-orange-50', iconColor: 'text-orange-500', badge: 'bg-orange-50 text-orange-700' },
  Report: { icon: FileText, iconBg: 'bg-violet-50', iconColor: 'text-violet-600', badge: 'bg-slate-100 text-slate-700' },
  Form: { icon: FileText, iconBg: 'bg-red-50', iconColor: 'text-red-500', badge: 'bg-pink-50 text-pink-700' },
  Other: { icon: FileText, iconBg: 'bg-slate-100', iconColor: 'text-slate-600', badge: 'bg-slate-100 text-slate-700' },
};

interface PatientDocumentsTableProps {
  documents: PatientDocument[];
}

export function PatientDocumentsTable({ documents }: PatientDocumentsTableProps) {
  const [page, setPage] = useState(1);
  const totalPages = 3;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs text-muted-foreground">
              <th className="w-8 px-4 py-3">
                <ArrowUpDown className="h-3.5 w-3.5" />
              </th>
              <th className="px-2 py-3 font-medium">Document name</th>
              <th className="px-5 py-3 font-medium">Type</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Uploaded by</th>
              <th className="px-5 py-3 font-medium">Tags</th>
              <th className="px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((document) => {
              const style = TYPE_STYLES[document.type];
              const Icon = style.icon;
              return (
                <tr key={document.id} className="border-b border-border last:border-0 hover:bg-muted/40">
                  <td className="px-4 py-4 text-muted-foreground">
                    <ArrowUpDown className="h-3.5 w-3.5 opacity-0" />
                  </td>
                  <td className="px-2 py-4">
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${style.iconBg}`}>
                        <Icon className={`h-4 w-4 ${style.iconColor}`} />
                      </div>
                      <div>
                        <p className="font-medium text-fg">{document.name}</p>
                        <p className="text-xs text-muted-foreground">{document.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`rounded-md px-2 py-1 text-xs font-medium ${style.badge}`}>{document.type}</span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-muted-foreground">{document.date}</td>
                  <td className="whitespace-nowrap px-5 py-4 text-muted-foreground">{document.uploadedBy}</td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-1.5">
                      {document.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-muted px-2 py-1 text-xs text-fg">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <button className="rounded-md p-1.5 hover:bg-muted hover:text-fg" aria-label="Preview">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="rounded-md p-1.5 hover:bg-muted hover:text-fg" aria-label="Download">
                        <Download className="h-4 w-4" />
                      </button>
                      <button className="rounded-md p-1.5 hover:bg-muted hover:text-fg" aria-label="More actions">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">Showing 1 to 8 of 24 documents</p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="rounded-md border border-border p-1.5 text-muted-foreground hover:bg-muted"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`h-8 w-8 rounded-md text-sm font-medium ${
                page === n ? 'bg-fg text-bg' : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="rounded-md border border-border p-1.5 text-muted-foreground hover:bg-muted"
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PatientDocumentsTable;