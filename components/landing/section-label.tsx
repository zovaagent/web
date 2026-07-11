interface SectionLabelProps {
  number: string;
  label: string;
  dark?: boolean;
}

export function SectionLabel({ number, label, dark }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-2.5">
      <span className={`text-xs font-bold tabular-nums ${dark ? 'text-[var(--zova-purple)]' : 'text-purple-600'}`}>{number}</span>
      <span className={`text-xs font-semibold tracking-[0.18em] uppercase ${dark ? 'text-white/40' : 'text-zinc-400'}`}>{label}</span>
    </div>
  );
}
