import { Home as HomeIcon, Sparkles } from "lucide-react";

const Page = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="text-center space-y-6 max-w-2xl px-6">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#C7A896] to-[#8C6D5A] flex items-center justify-center shadow-lg">
              <HomeIcon className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#F7EFE7] flex items-center justify-center shadow-md">
              <Sparkles className="w-4 h-4 text-[#C7A896]" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-b from-[#6B4F4F] to-[#4B3A34] bg-clip-text text-transparent">
          Home Dashboard
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-[#8B5E34] font-medium">Coming Soon</p>

        {/* Description */}
        <p className="text-[#A68B7C] max-w-md mx-auto">
          We're crafting a beautiful home experience for you. Your personalized
          mental wellness dashboard will be here soon with insights, progress
          tracking, and daily inspirations.
        </p>

        {/* Decorative Elements */}
        <div className="flex items-center justify-center gap-2 pt-4">
          <div className="w-2 h-2 rounded-full bg-[#C7A896]"></div>
          <div className="w-2 h-2 rounded-full bg-[#B08F7A]"></div>
          <div className="w-2 h-2 rounded-full bg-[#8C6D5A]"></div>
        </div>
      </div>
    </div>
  );
};

export default Page;
