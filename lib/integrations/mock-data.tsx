import { Integration, IntegrationDetail, IntegrationResource, IntegrationStat } from "./types";

export const integrationStats: IntegrationStat[] = [
  { id: "total", label: "Total integrations", value: "18", captionLabel: "All connected tools" },
  { id: "connected", label: "Connected", value: "9", captionLabel: "Active integrations" },
  { id: "available", label: "Available", value: "9", captionLabel: "Ready to connect" },
  {
    id: "sync",
    label: "Data sync status",
    value: "All synced",
    captionLabel: "Last sync: 2 min ago",
    showLiveDot: true,
  },
];

export const connectedIntegrations: Integration[] = [
  {
    id: "bestpractice",
    name: "BestPractice",
    description: "Clinical decision support and evidence-based guidelines",
    logoLabel: "BP",
    logoClassName: "bg-violet-100 text-violet-700",
    category: "EHR/EMR",
    status: "connected",
    lastSyncLabel: "Sync: 2 min ago",
  },
  {
    id: "drchrono",
    name: "DrChrono EHR",
    description: "Electronic health records sync",
    logoLabel: "dr",
    logoClassName: "bg-emerald-600 text-white",
    category: "EHR/EMR",
    status: "connected",
    lastSyncLabel: "Sync: 5 min ago",
  },
  {
    id: "mailchimp",
    name: "Mailchimp",
    description: "Patient communications and newsletters",
    logoLabel: "MC",
    logoClassName: "bg-amber-400 text-amber-950",
    category: "Communication",
    status: "connected",
    lastSyncLabel: "Sync: 1 hour ago",
  },
  {
    id: "stripe",
    name: "Stripe",
    description: "Secure payment processing",
    logoLabel: "S",
    logoClassName: "bg-indigo-600 text-white",
    category: "Payments",
    status: "connected",
    lastSyncLabel: "Sync: 10 min ago",
  },
  {
    id: "twilio",
    name: "Twilio",
    description: "SMS and voice communication",
    logoLabel: "T",
    logoClassName: "bg-red-600 text-white",
    category: "Communication",
    status: "connected",
    lastSyncLabel: "Sync: 3 min ago",
  },
];

export const availableIntegrations: Integration[] = [
  {
    id: "epic",
    name: "Epic Systems",
    description: "Connect with Epic EHR",
    logoLabel: "Epic",
    logoClassName: "bg-white text-red-600 border border-border",
    category: "EHR/EMR",
    status: "available",
  },
  {
    id: "google-calendar",
    name: "Google Calendar",
    description: "Sync appointments and availability",
    logoLabel: "31",
    logoClassName: "bg-white text-blue-600 border border-border",
    category: "Practice management",
    status: "available",
  },
  {
    id: "microsoft-teams",
    name: "Microsoft Teams",
    description: "Enable collaboration and notifications",
    logoLabel: "T",
    logoClassName: "bg-indigo-500 text-white",
    category: "Communication",
    status: "available",
  },
];

export const selectedIntegrationDetail: IntegrationDetail = {
  id: "drchrono",
  name: "DrChrono EHR",
  description: "Electronic health records sync",
  longDescription:
    "Automatically sync patient demographics, appointments, clinical notes, and documents between Tandem and DrChrono.",
  logoLabel: "dr",
  logoClassName: "bg-emerald-600 text-white",
  connectedOn: "12 May 2026, 09:15",
  lastSync: "2 minutes ago",
  nextSync: "In 3 minutes",
  dataSynced: "Patients, Appointments, Notes, Documents",
  syncFrequency: "Every 5 minutes",
};

export const integrationResources: IntegrationResource[] = [
  {
    id: "guide",
    title: "Integration guide",
    description: "Step-by-step setup instructions",
    iconClassName: "bg-blue-50 text-blue-600",
  },
  {
    id: "api-docs",
    title: "API documentation",
    description: "Technical documentation and API reference",
    iconClassName: "bg-blue-50 text-blue-600",
  },
  {
    id: "webhooks",
    title: "Webhooks",
    description: "Real-time event notifications",
    iconClassName: "bg-violet-50 text-violet-600",
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    description: "Common issues and solutions",
    iconClassName: "bg-amber-50 text-amber-600",
  },
];