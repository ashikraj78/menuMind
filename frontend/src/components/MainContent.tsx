"use client";

export default function MainContent() {
  return (
    <div className="bg-[var(--background-gray)] rounded-t-[30px] flex-1 overflow-y-auto">
      {/* Greeting Section */}
      <div className="px-9 pt-8 pb-6">
        <h1 className="text-[30px] font-bold font-['League_Spartan'] text-[var(--text-white)] mb-1 leading-tight">
          Good Morning
        </h1>
        <p className="text-[13px] font-medium font-['League_Spartan'] text-[var(--primary-orange)] leading-tight">
          Rise and shine! It's breakfast time
        </p>
      </div>

      {/* Divider Line */}
      <div className="mx-9 mb-6">
        <div className="h-px bg-orange-200"></div>
      </div>
    </div>
  );
}
