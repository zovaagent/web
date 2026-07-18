"use client";

export function FinalCta() {
  const scrollToGenerator = () => {
    document
      .getElementById("interactive-agent-generator")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-b from-[#05050a] to-[#0a0a12] text-center border-t border-white/10">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#6d4dff]/10 blur-[120px] pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-8 relative z-10">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] text-white leading-tight">
          The future belongs to <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#a78bfa] via-[#8d72ff] to-[#3ed8ff]">
            intelligent systems.
          </span>
        </h2>
        <p className="text-sm md:text-base text-white/50 font-light max-w-lg mx-auto">
          Welcome to the Zone of Virtual Autonomy. Step into the next paradigm
          of automated computing.
        </p>
        <div>
          <button
            onClick={scrollToGenerator}
            className="px-8 py-4 bg-gradient-to-br from-[#6d4dff] to-[#4b2cd6] hover:from-[#7a5eff] hover:to-[#5b3ce8] text-white font-medium shadow-lg shadow-[#6d4dff]/25 transition-all cursor-pointer text-sm"
          >
            Build Your First Agent
          </button>
        </div>
      </div>
    </section>
  );
}
