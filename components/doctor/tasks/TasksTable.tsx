"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  FileText,
  CalendarClock,
  Bell,
  Share2,
  ShieldCheck,
  Users,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  LucideIcon,
} from "lucide-react";

type TaskType = "Follow-up" | "Review" | "Documentation" | "Administrative" | "Referral";
type Priority = "High" | "Medium" | "Low";
type Status = "Pending" | "In progress" | "Completed";

type Task = {
  id: string;
  title: string;
  description: string;
  type: TaskType;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  patientName: string | null;
  patientId: string | null;
  avatarInitials: string;
  avatarBg: string;
  avatarColor: string;
  dueDate: string;
  dueTime: string;
  priority: Priority;
  status: Status;
  assignedTo: string;
};

const TYPE_BADGE: Record<TaskType, string> = {
  "Follow-up": "bg-emerald-50 text-emerald-700",
  Review: "bg-blue-50 text-blue-700",
  Documentation: "bg-violet-50 text-violet-700",
  Administrative: "bg-teal-50 text-teal-700",
  Referral: "bg-indigo-50 text-indigo-700",
};

const PRIORITY_BADGE: Record<Priority, string> = {
  High: "bg-red-50 text-red-600",
  Medium: "bg-orange-50 text-orange-600",
  Low: "bg-emerald-50 text-emerald-700",
};

const STATUS_BADGE: Record<Status, string> = {
  Pending: "bg-orange-50 text-orange-600",
  "In progress": "bg-blue-50 text-blue-700",
  Completed: "bg-emerald-50 text-emerald-700",
};

const tasks: Task[] = [
  {
    id: "1",
    title: "Follow up with patient",
    description: "Phone call",
    type: "Follow-up",
    icon: Phone,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    patientName: "Anna Johansen",
    patientId: "123456",
    avatarInitials: "AJ",
    avatarBg: "bg-violet-100",
    avatarColor: "text-violet-700",
    dueDate: "12 May 2026",
    dueTime: "09:00",
    priority: "High",
    status: "Pending",
    assignedTo: "Dr. Emma Larsen",
  },
  {
    id: "2",
    title: "Review lab results",
    description: "Blood test results",
    type: "Review",
    icon: Mail,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    patientName: "Mark Thompson",
    patientId: "789012",
    avatarInitials: "MT",
    avatarBg: "bg-blue-100",
    avatarColor: "text-blue-700",
    dueDate: "12 May 2026",
    dueTime: "11:30",
    priority: "Medium",
    status: "Pending",
    assignedTo: "Dr. Emma Larsen",
  },
  {
    id: "3",
    title: "Complete consultation note",
    description: "General consultation",
    type: "Documentation",
    icon: FileText,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    patientName: "Sarah Lee",
    patientId: "345678",
    avatarInitials: "SL",
    avatarBg: "bg-pink-100",
    avatarColor: "text-pink-700",
    dueDate: "12 May 2026",
    dueTime: "14:00",
    priority: "Medium",
    status: "In progress",
    assignedTo: "Dr. Emma Larsen",
  },
  {
    id: "4",
    title: "Schedule follow-up",
    description: "Diabetes management",
    type: "Administrative",
    icon: CalendarClock,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    patientName: "James Wilson",
    patientId: "901234",
    avatarInitials: "JW",
    avatarBg: "bg-orange-100",
    avatarColor: "text-orange-700",
    dueDate: "13 May 2026",
    dueTime: "09:00",
    priority: "Low",
    status: "Pending",
    assignedTo: "Nurse Ingrid",
  },
  {
    id: "5",
    title: "Check medication adherence",
    description: "Prescription review",
    type: "Follow-up",
    icon: Bell,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    patientName: "Betty Jacobsen",
    patientId: "567890",
    avatarInitials: "BJ",
    avatarBg: "bg-red-100",
    avatarColor: "text-red-700",
    dueDate: "14 May 2026",
    dueTime: "10:00",
    priority: "High",
    status: "Pending",
    assignedTo: "Dr. Emma Larsen",
  },
  {
    id: "6",
    title: "Send referral",
    description: "Physiotherapy",
    type: "Referral",
    icon: Share2,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    patientName: "Oliver Larsen",
    patientId: "234567",
    avatarInitials: "OL",
    avatarBg: "bg-emerald-100",
    avatarColor: "text-emerald-700",
    dueDate: "15 May 2026",
    dueTime: "15:00",
    priority: "Medium",
    status: "Pending",
    assignedTo: "Dr. Emma Larsen",
  },
  {
    id: "7",
    title: "Quality check",
    description: "Monthly patient audit",
    type: "Administrative",
    icon: ShieldCheck,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    patientName: null,
    patientId: null,
    avatarInitials: "",
    avatarBg: "bg-muted",
    avatarColor: "text-muted-foreground",
    dueDate: "16 May 2026",
    dueTime: "17:00",
    priority: "Low",
    status: "Pending",
    assignedTo: "Dr. Emma Larsen",
  },
  {
    id: "8",
    title: "Update care plan",
    description: "Hypertension",
    type: "Documentation",
    icon: FileText,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    patientName: "Paul Hansen",
    patientId: "678901",
    avatarInitials: "PH",
    avatarBg: "bg-violet-100",
    avatarColor: "text-violet-700",
    dueDate: "17 May 2026",
    dueTime: "09:30",
    priority: "Medium",
    status: "Pending",
    assignedTo: "Dr. Emma Larsen",
  },
];

export default function TasksTable() {
  const [page, setPage] = useState(1);
  const totalPages = 3;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs text-muted-foreground">
              <th className="w-10 px-4 py-3">
                <input type="checkbox" className="h-4 w-4 rounded border-border" />
              </th>
              <th className="px-2 py-3 font-medium">Task</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Patient</th>
              <th className="px-4 py-3 font-medium">Due date</th>
              <th className="px-4 py-3 font-medium">Priority</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Assigned to</th>
              <th className="w-10 px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => {
              const Icon = task.icon;
              return (
                <tr key={task.id} className="border-b border-border last:border-0 hover:bg-muted/40">
                  <td className="px-4 py-4">
                    <input type="checkbox" className="h-4 w-4 rounded border-border" />
                  </td>
                  <td className="px-2 py-4">
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${task.iconBg}`}>
                        <Icon className={`h-4 w-4 ${task.iconColor}`} />
                      </div>
                      <div>
                        <p className="whitespace-nowrap font-medium text-fg">{task.title}</p>
                        <p className="text-xs text-muted-foreground">{task.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium ${TYPE_BADGE[task.type]}`}>
                      {task.type}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    {task.patientName ? (
                      <div className="flex items-center gap-2">
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${task.avatarBg} ${task.avatarColor}`}
                        >
                          {task.avatarInitials}
                        </span>
                        <div>
                          <p className="whitespace-nowrap text-fg">{task.patientName}</p>
                          <p className="text-xs text-muted-foreground">ID: {task.patientId}</p>
                        </div>
                      </div>
                    ) : (
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-muted-foreground">
                        <Users className="h-3.5 w-3.5" />
                      </span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-muted-foreground">
                    {task.dueDate}
                    <br />
                    {task.dueTime}
                  </td>
                  <td className="px-4 py-4">
                    <span className={`rounded-md px-2 py-1 text-xs font-medium ${PRIORITY_BADGE[task.priority]}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium ${STATUS_BADGE[task.status]}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-fg">{task.assignedTo}</td>
                  <td className="px-4 py-4">
                    <button className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-fg" aria-label="More actions">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">Showing 1 to 8 of 24 tasks</p>
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
                page === n ? "bg-fg text-bg" : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {n}
            </button>
          ))}
          <span className="px-1 text-muted-foreground">...</span>
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