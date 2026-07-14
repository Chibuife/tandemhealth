export type IntegrationCategory =
  | "EHR/EMR"
  | "Practice management"
  | "Communication"
  | "Labs & imaging"
  | "Payments"
  | "Analytics"
  | "Other";

export interface Integration {
  id: string;
  name: string;
  description: string;
  logoLabel: string; // short mark shown in the logo chip, e.g. "BP", "S"
  logoClassName: string; // bg + text tailwind classes for the logo chip
  category: IntegrationCategory;
  status: "connected" | "available";
  lastSyncLabel?: string; // e.g. "Sync: 2 min ago", only for connected integrations
}

export interface IntegrationStat {
  id: string;
  label: string;
  value: string;
  captionLabel: string;
  showLiveDot?: boolean;
}

export interface IntegrationDetail {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  logoLabel: string;
  logoClassName: string;
  connectedOn: string;
  lastSync: string;
  nextSync: string;
  dataSynced: string;
  syncFrequency: string;
}

export interface IntegrationResource {
  id: string;
  title: string;
  description: string;
  iconClassName: string;
}