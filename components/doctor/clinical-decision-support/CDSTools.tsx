import {
  Calculator,
  ChevronRight,
  GitCompareArrows,
  LucideIcon,
  MessageCircleQuestion,
  Search,
  ShieldAlert,
  UserCheck,
} from "lucide-react";

interface Tool {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
}

const tools: Tool[] = [
  {
    icon: MessageCircleQuestion,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    title: "Ask a clinical question",
    description: "Get evidence-based answers to clinical questions",
  },
  {
    icon: UserCheck,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    title: "Patient risk assessment",
    description: "Assess risk scores and clinical outcomes",
  },
  {
    icon: ShieldAlert,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    title: "Drug interaction checker",
    description: "Check for potential drug interactions",
  },
  {
    icon: Search,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    title: "Guideline search",
    description: "Search and browse clinical guidelines",
  },
  {
    icon: GitCompareArrows,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    title: "Differential diagnosis helper",
    description: "Generate differential diagnoses by symptoms",
  },
  {
    icon: Calculator,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
    title: "Medical calculators",
    description: "Access common clinical calculators",
  },
];

export default function CDSTools() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <h2 className="mb-3 text-sm font-semibold text-gray-900">
        Clinical decision support tools
      </h2>

      <ul className="divide-y divide-gray-100">
        {tools.map((tool) => (
          <li key={tool.title}>
            <button
              type="button"
              className="flex w-full items-center gap-3 py-3 text-left first:pt-0 last:pb-0"
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${tool.iconBg}`}
              >
                <tool.icon className={`h-4 w-4 ${tool.iconColor}`} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-gray-900">
                  {tool.title}
                </span>
                <span className="block text-xs text-gray-500">{tool.description}</span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-gray-300" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}