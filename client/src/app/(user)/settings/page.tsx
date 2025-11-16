"use client";

import React, { useState } from "react";
import {
  Settings as SettingsIcon,
  Check,
  Crown,
  Shield,
  Zap,
  Lock,
  Cloud,
  Cpu,
  Server,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Page = () => {
  const [selectedPlan, setSelectedPlan] = useState<"regular" | "premium">(
    "regular"
  );

  const plans = {
    regular: {
      name: "Regular",
      price: "Rs. 800/month",
      description: "Essential mental wellness support",
      icon: Cloud,
      color: "from-[#C7A896] to-[#B08F7A]",
      features: [
        { text: "Unlimited chat conversations", included: true },
        { text: "AI-powered mental wellness support", included: true },
        { text: "Task extraction and reminders", included: true },
        { text: "Cloud-based processing", included: true },
        { text: "Standard response time", included: true },
        { text: "Data stored on our servers", included: false },
        { text: "Local LLM processing", included: false },
        { text: "Complete privacy guarantee", included: false },
      ],
    },
    premium: {
      name: "Premium",
      price: "Rs. 400/month",
      description: "Ultimate privacy with local AI processing",
      icon: Crown,
      color: "from-[#8C6D5A] to-[#6B4F4F]",
      features: [
        { text: "Everything in Regular", included: true },
        { text: "100% Local LLM processing", included: true, highlight: true },
        {
          text: "Complete privacy - No data leaves your device",
          included: true,
          highlight: true,
        },
        { text: "Faster response times", included: true },
        { text: "Offline capabilities", included: true },
        { text: "Advanced AI models", included: true },
        { text: "Priority support", included: true },
        { text: "Custom model selection", included: true },
      ],
    },
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#B08F7A] to-[#6B4F4F] flex items-center justify-center shadow-lg">
            <SettingsIcon className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-[#6B4F4F] mb-2">
          Settings & Subscription
        </h1>
        <p className="text-[#A68B7C]">
          Choose the plan that best fits your privacy needs
        </p>
      </div>

      {/* Privacy Notice */}
      <Card className="mb-8 border-2 border-[#C7A896] bg-gradient-to-r from-[#FCF8F4] to-[#FEF4D6]">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#8C6D5A] to-[#6B4F4F] flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-[#6B4F4F] mb-2">
                Privacy First Approach
              </h3>
              <p className="text-sm text-[#A68B7C]">
                With our Premium plan, all AI processing happens locally on your
                device. Your conversations, thoughts, and personal data never
                leave your computer, ensuring complete privacy and security.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plans Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Regular Plan */}
        <Card
          className={`relative overflow-hidden transition-all cursor-pointer ${
            selectedPlan === "regular"
              ? "border-2 border-[#C7A896] shadow-lg"
              : "border-[#D9C8BA] hover:shadow-md"
          }`}
          onClick={() => setSelectedPlan("regular")}
        >
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plans.regular.color} flex items-center justify-center`}
                >
                  <plans.regular.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-[#6B4F4F]">
                    {plans.regular.name}
                  </CardTitle>
                  <p className="text-sm text-[#A68B7C]">
                    {plans.regular.description}
                  </p>
                </div>
              </div>
            </div>
            <div className="text-3xl font-bold text-[#4B3A34]">
              {plans.regular.price}
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {plans.regular.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      feature.included
                        ? "bg-[#C7A896]"
                        : "bg-gray-200 opacity-50"
                    }`}
                  >
                    <Check
                      className={`w-3 h-3 ${
                        feature.included ? "text-white" : "text-gray-400"
                      }`}
                    />
                  </div>
                  <span
                    className={`text-sm ${
                      feature.included ? "text-[#4B3A34]" : "text-[#A68B7C]"
                    }`}
                  >
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>
            <Button
              className={`w-full mt-6 ${
                selectedPlan === "regular"
                  ? "bg-gradient-to-r from-[#C7A896] to-[#B08F7A]"
                  : "bg-[#E6D4C3]"
              } hover:from-[#B08F7A] hover:to-[#8C6D5A] text-white`}
              disabled={selectedPlan === "regular"}
            >
              {selectedPlan === "regular" ? "Current Plan" : "Select Plan"}
            </Button>
          </CardContent>
        </Card>

        {/* Premium Plan */}
        <Card
          className={`relative overflow-hidden transition-all cursor-pointer ${
            selectedPlan === "premium"
              ? "border-2 border-[#8C6D5A] shadow-xl"
              : "border-[#D9C8BA] hover:shadow-md"
          }`}
          onClick={() => setSelectedPlan("premium")}
        >
          {/* Premium Badge */}
          <div className="absolute top-4 right-4">
            <Badge className="bg-gradient-to-r from-[#8C6D5A] to-[#6B4F4F] text-white border-0">
              Recommended
            </Badge>
          </div>

          <CardHeader className="pb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plans.premium.color} flex items-center justify-center shadow-lg`}
                >
                  <plans.premium.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-[#6B4F4F]">
                    {plans.premium.name}
                  </CardTitle>
                  <p className="text-sm text-[#A68B7C]">
                    {plans.premium.description}
                  </p>
                </div>
              </div>
            </div>
            <div className="text-3xl font-bold text-[#4B3A34]">
              {plans.premium.price}
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {plans.premium.features.map((feature, index) => (
                <li
                  key={index}
                  className={`flex items-start gap-2 ${
                    feature.highlight
                      ? "bg-[#FEF4D6]/50 -mx-2 px-2 py-1 rounded"
                      : ""
                  }`}
                >
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-gradient-to-br from-[#8C6D5A] to-[#6B4F4F]">
                    {feature.highlight ? (
                      <Lock className="w-3 h-3 text-white" />
                    ) : (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <span
                    className={`text-sm ${
                      feature.highlight
                        ? "font-medium text-[#6B4F4F]"
                        : "text-[#4B3A34]"
                    }`}
                  >
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>
            <Button
              className={`w-full mt-6 ${
                selectedPlan === "premium"
                  ? "bg-gradient-to-r from-[#8C6D5A] to-[#6B4F4F]"
                  : "bg-[#C7A896]"
              } hover:from-[#6B4F4F] hover:to-[#4B3A34] text-white`}
              disabled={selectedPlan === "premium"}
            >
              {selectedPlan === "premium"
                ? "Current Plan"
                : "Upgrade to Premium"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Comparison Features */}
      <Card className="border-[#D9C8BA]">
        <CardHeader>
          <CardTitle className="text-xl text-[#6B4F4F]">
            Privacy & Processing Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Regular */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-[#D9C8BA]">
                <Server className="w-5 h-5 text-[#C7A896]" />
                <h4 className="font-semibold text-[#6B4F4F]">Regular Plan</h4>
              </div>
              <div className="space-y-3 text-sm text-[#A68B7C]">
                <p>• Data processed on secure cloud servers</p>
                <p>• Conversations encrypted in transit</p>
                <p>• Industry-standard security measures</p>
                <p>• May be subject to data retention policies</p>
              </div>
            </div>

            {/* Premium */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-[#D9C8BA]">
                <Cpu className="w-5 h-5 text-[#8C6D5A]" />
                <h4 className="font-semibold text-[#6B4F4F]">Premium Plan</h4>
              </div>
              <div className="space-y-3 text-sm text-[#6B4F4F] font-medium">
                <p className="flex items-center gap-2">
                  <Lock className="w-4 h-4" /> All processing happens locally
                </p>
                <p className="flex items-center gap-2">
                  <Shield className="w-4 h-4" /> Zero data leaves your device
                </p>
                <p className="flex items-center gap-2">
                  <Zap className="w-4 h-4" /> Faster, offline-capable
                </p>
                <p className="flex items-center gap-2">
                  <Crown className="w-4 h-4" /> True privacy guarantee
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <div className="mt-8 text-center">
        <p className="text-sm text-[#A68B7C] mb-4">
          Questions about plans or privacy?{" "}
          <a href="#" className="text-[#8C6D5A] hover:underline font-medium">
            Contact support
          </a>
        </p>
      </div>
    </div>
  );
};

export default Page;
