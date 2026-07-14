"use client";

import { FormEvent, useState } from "react";
import { FileText, ImageIcon, Lock, Paperclip, Send } from "lucide-react";

interface MessageComposerProps {
  onSend?: (message: string) => void;
}

export default function MessageComposer({ onSend }: MessageComposerProps) {
  const [draft, setDraft] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) return;
    onSend?.(trimmed);
    setDraft("");
  };

  return (
    <div className="border-t border-border p-4">
      <form onSubmit={handleSubmit}>
        <textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Type a message..."
          rows={2}
          className="w-full resize-none rounded-lg border border-border px-3 py-2.5 text-sm text-fg placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-fg/10"
        />

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Attach file"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-fg-muted hover:bg-bg-subtle"
            >
              <Paperclip className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Attach image"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-fg-muted hover:bg-bg-subtle"
            >
              <ImageIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Attach document"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-fg-muted hover:bg-bg-subtle"
            >
              <FileText className="h-4 w-4" />
            </button>
          </div>

          <button
            type="submit"
            className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-600"
          >
            <Send className="h-4 w-4" />
            Send
          </button>
        </div>
      </form>

      <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-fg-muted">
        <Lock className="h-3 w-3" />
        Messages are secure and encrypted
      </p>
    </div>
  );
}