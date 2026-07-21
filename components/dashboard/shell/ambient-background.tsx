export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-40 left-1/4 h-[520px] w-[520px] rounded-full bg-[#8b5cf6]/[0.14] blur-[160px]" />
      <div className="absolute top-1/2 -right-40 h-[480px] w-[480px] rounded-full bg-[#a78bfa]/[0.08] blur-[180px]" />
      <div className="absolute bottom-0 left-0 h-[380px] w-[380px] rounded-full bg-[#6d28d9]/[0.10] blur-[160px]" />
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.9) 1px, transparent 0)",
          backgroundSize: "36px 36px",
        }}
      />
    </div>
  );
}
