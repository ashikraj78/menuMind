"use client";

import { Send } from "lucide-react";

export default function ChatInterface() {
  return (
    <div className="bg-[var(--primary-orange)] px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5">
      {/* Chat Input */}
      <div className="bg-[var(--primary-yellow)] border-2 border-[var(--primary-orange)] rounded-[30px] sm:rounded-[40px] lg:rounded-[50px] p-3 sm:p-4 lg:p-5 relative max-w-4xl mx-auto">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex-1">
            <p className="text-xs sm:text-sm lg:text-base font-light text-black/55 leading-relaxed">
              Tell me your budget or mood — I'll find the perfect bite!
            </p>
          </div>

          {/* Send Button */}
          <div className="bg-[var(--primary-orange)] rounded-full p-2 sm:p-2.5 lg:p-3">
            <Send
              size={16}
              className="text-white sm:w-5 sm:h-5 lg:w-6 lg:h-6"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
