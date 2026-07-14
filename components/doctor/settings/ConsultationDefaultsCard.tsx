"use client";

import { useState } from "react";
import { Calendar, FileText } from "lucide-react";
import SettingsSelectField from "./SettingsSelectField";
import ToggleSwitch from "./ToggleSwitch";

export default function ConsultationDefaultsCard() {
  const [autoGenerateNotes, setAutoGenerateNotes] = useState(true);
  const [aiSuggestions, setAiSuggestions] = useState(true);

  return (
    <div className="mt-4 rounded-2xl border border-border bg-white p-5">
      <h3 className="text-sm font-semibold text-fg">Consultation defaults</h3>
      <p className="mt-0.5 text-sm text-fg-muted">Set default options for new consultations.</p>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SettingsSelectField label="Default note template" value="SOAP Note" icon={FileText} />
        <SettingsSelectField label="Default follow-up period" value="2 weeks" icon={Calendar} />

        <div className="flex items-start justify-between gap-3 sm:col-span-1">
          <div>
            <p className="text-sm font-medium text-fg">Automatically generate clinical notes</p>
            <p className="text-sm text-fg-muted">Generate notes after each consultation</p>
          </div>
          <ToggleSwitch
            checked={autoGenerateNotes}
            onChange={setAutoGenerateNotes}
            label="Automatically generate clinical notes"
          />
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-fg">AI suggestions</p>
          <p className="text-sm text-fg-muted">Show AI suggestions during documentation</p>
        </div>
        <ToggleSwitch checked={aiSuggestions} onChange={setAiSuggestions} label="AI suggestions" />
      </div>
    </div>
  );
}