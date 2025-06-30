"use client";

export default function PromoCard() {
  return (
    <div className="mx-9 mb-6">
      <div className="bg-gradient-to-r from-orange-600 to-orange-300 rounded-[20px] p-6 relative overflow-hidden shadow-lg">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200 to-transparent rounded-full -translate-y-8 translate-x-8 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-yellow-200 to-transparent rounded-full translate-y-8 -translate-x-8 opacity-30"></div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex-1 w-full">
            <h2 className="text-[20px] font-bold text-[var(--text-white)] mb-1 leading-tight">
              Get 30% OFF
            </h2>
            <p className="text-[16px] font-normal text-[var(--text-white)] leading-tight">
              Experience our delicious dish
            </p>
          </div>

          {/* Food Image Placeholder */}
          <div className="w-32 h-24 bg-gradient-to-br from-orange-300 to-orange-500 rounded-[20px] ml-4 flex items-center justify-center shadow-md">
            <div className="w-20 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">🍕</span>
            </div>
          </div>
        </div>
      </div>
      {/* Progress Indicator */}
      <div className="flex justify-center gap-1 mb-6 mt-6">
        <div className="w-5 h-1 bg-[var(--primary-orange)] rounded-full"></div>
        <div className="w-5 h-1 bg-[var(--accent-yellow)] rounded-full"></div>
        <div className="w-5 h-1 bg-[var(--accent-yellow)] rounded-full"></div>
        <div className="w-5 h-1 bg-[var(--accent-yellow)] rounded-full"></div>
        <div className="w-5 h-1 bg-[var(--accent-yellow)] rounded-full"></div>
      </div>
    </div>
  );
}
