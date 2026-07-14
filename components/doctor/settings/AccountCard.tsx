interface AccountCardProps {
  name?: string;
  email?: string;
  onEditProfile?: () => void;
}

export default function AccountCard({
  name = "Dr. Emma Larsen",
  email = "emma.larsen@example.com",
  onEditProfile,
}: AccountCardProps) {
  const initials = name
    .replace("Dr. ", "")
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <div className="rounded-2xl border border-border bg-white p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-fg">Account</h3>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-medium text-violet-700">
            {initials}
          </span>
          <div>
            <p className="text-sm font-medium text-fg">{name}</p>
            <p className="flex items-center gap-2 text-sm text-fg-muted">
              {email}
              <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-600">
                Verified
              </span>
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onEditProfile}
          className="shrink-0 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-fg hover:bg-bg-subtle"
        >
          Edit profile
        </button>
      </div>
    </div>
  );
}