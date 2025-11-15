"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Check,
  HeartHandshake,
  MessageCircle,
  Clock,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FCF8F4] text-[#4B3A34]">

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-12 gap-10 items-center">

          {/* LEFT SIDE */}
          <div className="lg:col-span-7">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight max-w-2xl text-[#4B3A34]">
              Find calm & clarity with{" "}
              <span className="block">Aashaa — your mental wellness companion</span>
            </h1>

            <p className="mt-6 text-lg text-[#6B4F4F] max-w-2xl">
              Private, empathetic chats with an AI that listens — plus access to certified mentors.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/home">
                <button className="inline-flex items-center gap-3 bg-[#4B3A34] text-white px-5 py-3 rounded-md shadow transition-all hover:bg-[#3C2E2A] hover:shadow-lg hover:-translate-y-0.5">
                  Start Chat
                </button>
              </Link>

              <Link href="/mentors">
                <button className="inline-flex items-center gap-3 border border-[#4B3A34] text-[#4B3A34] px-5 py-3 rounded-md transition-all hover:bg-[#4B3A34] hover:text-white hover:shadow-lg hover:-translate-y-0.5">
                  Book a Mentor
                </button>
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-6 items-center text-sm text-[#6B4F4F]">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center">✓</span>
                <span>Private & confidential</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center">✓</span>
                <span>24/7 AI support</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="lg:col-span-5 relative">
            <div
              className="absolute -inset-y-6 right-0 w-3/4 md:w-full rounded-3xl overflow-hidden opacity-90"
              aria-hidden
            >
              <div className="h-full w-full bg-[url('/images/hero-accent.png')] bg-cover bg-right/40" />
            </div>

            <div className="relative mx-auto w-full md:w-[420px] rounded-3xl overflow-hidden bg-white border border-[#D9C8BA] shadow-lg">
              <Image
                src="https://cdn.prod.website-files.com/640f59825ad6d8a9545240ba/685db14b1329ed9dfa86c7a4_best-ai-mental-health-apps-for-2025.png"
                alt="Aashaa conversation"
                width={560}
                height={420}
                className="object-cover w-full h-80"
              />

              <div className="p-6">
                <h4 className="text-xl font-semibold text-[#4B3A34]">Need to talk right now?</h4>
                <p className="mt-2 text-[#6B4F4F] text-sm">
                  Start a free chat with Aashaa’s empathetic AI — or schedule a mentor call.
                </p>

                <div className="mt-4 flex gap-3">
                  <Link href="/home">
                    <button className="bg-[#4B3A34] text-white px-4 py-2 rounded-md text-sm transition-all hover:bg-[#3C2E2A] hover:-translate-y-0.5 hover:shadow-md">
                      Chat now
                    </button>
                  </Link>

                  <Link href="/mentors">
                    <button className="border border-[#D9C8BA] px-4 py-2 rounded-md text-sm text-[#4B3A34] transition-all hover:bg-[#4B3A34] hover:text-white hover:-translate-y-0.5 hover:shadow-md">
                      Schedule
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-12 gap-8 items-center">

          <div className="lg:col-span-7">
            <h2 className="text-3xl font-bold text-[#4B3A34]">
              Private support, straightforward care
            </h2>

            <p className="mt-4 text-[#6B4F4F]">
              Aashaa blends compassionate AI with access to trained mentors, helping you build habits that heal.
            </p>

            <ul className="mt-6 space-y-3 text-[#6B4F4F]">
              <li className="flex items-start gap-3">
                <Check className="text-[#4B3A34] mt-1" /> Conversations that feel human
              </li>
              <li className="flex items-start gap-3">
                <Check className="text-[#4B3A34] mt-1" /> Gentle reminders & self-care nudges
              </li>
              <li className="flex items-start gap-3">
                <Check className="text-[#4B3A34] mt-1" /> Book certified mentors anytime
              </li>
            </ul>

            <div className="mt-6">
              <button className="bg-white border border-[#4B3A34] px-4 py-2 rounded-md hover:bg-[#4B3A34] hover:text-white transition-all">
                Learn more
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-white border border-[#D9C8BA] p-6">
              <Image
                src="/images/app-screenshot.png"
                alt="Aashaa app"
                width={520}
                height={300}
              />
            </div>
          </div>

        </div>
      </section>

      {/* FEATURE CARDS */}
      <section id="features" className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-6">

          <FeatureCard
            title="Empathetic AI Chat"
            desc="Warm, always-available conversations designed to comfort you."
            Icon={MessageCircle}
          />

          <FeatureCard
            title="Certified Mentors"
            desc="Book short sessions for personalized guidance."
            Icon={HeartHandshake}
          />

          <FeatureCard
            title="Reminders & Routines"
            desc="Set gentle nudges for sleep, breaks, and mindfulness."
            Icon={Clock}
          />

        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* LEFT SIDE TEXT */}
          <div>
            <h2 className="text-3xl font-bold text-[#4B3A34]">
              Support that fits your journey — clear and simple
            </h2>

            <p className="mt-4 text-[#6B4F4F] text-lg">
              Choose the level of support that feels right for your emotional wellness.
            </p>

            <button className="mt-6 px-6 py-2 text-white bg-[#4B3A34] rounded-md hover:bg-[#3C2E2A]">
              Learn More
            </button>
          </div>

          {/* RIGHT — 3 CARDS */}
          <div className="grid md:grid-cols-3 gap-6">

            <PricingCard
              title="Free Care"
              price="₹0"
              color="#FCF8F4"
              items={[
                "Unlimited AI chat",
                "Daily affirmations",
                "Emotional check-ins",
              ]}
              filled={false}
            />

            <PricingCard
              title="Mentor Session"
              price="₹499"
              color="white"
              items={[
                "45-min mentor call",
                "Follow-up guidance",
                "Personalized plan",
              ]}
              filled={true}
            />

            <PricingCard
              title="Monthly Care"
              price="₹1699"
              color="#F7EFE7"
              items={[
                "4 mentor calls",
                "Unlimited AI chats",
                "Weekly tasks",
                "Priority support",
              ]}
              filled={false}
            />

          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl p-10 shadow-lg border border-[#D9C8BA]">
          <h2 className="text-3xl font-bold text-center text-[#4B3A34]">
            Stories from people who found calm
          </h2>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <Testimonial quote="When stress kept me awake, Aashaa helped me breathe and slow down." name="Priya S." role="Student" />
            <Testimonial quote="Mentor sessions gave me clarity and tools I still use every day." name="Rohit K." role="Designer" />
            <Testimonial quote="Aashaa feels like a friend I can talk to anytime." name="Sneha M." role="Product Manager" />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12 text-center">
        <h3 className="text-2xl font-bold text-[#4B3A34]">Ready to feel lighter?</h3>
        <p className="mt-2 text-[#6B4F4F]">
          Start a free chat or book a mentor — support is one click away.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <Link href="/chat">
            <button className="bg-[#4B3A34] text-white px-6 py-2 rounded-md">
              Start a Free Chat
            </button>
          </Link>
          <Link href="/signup">
            <button className="border border-[#4B3A34] px-6 py-2 rounded-md text-[#4B3A34]">
              Create Account
            </button>
          </Link>
        </div>
      </section>

    </div>
  );
}

/* ---------------- Components ---------------- */

function FeatureCard({ title, desc, Icon }: any) {
  return (
    <div className="rounded-2xl p-6 bg-white border border-[#D9C8BA] shadow-sm hover:shadow-md transition">
      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#F6EEE7]">
        <Icon className="w-6 h-6 text-[#4B3A34]" />
      </div>
      <h4 className="mt-4 font-semibold text-[#4B3A34]">{title}</h4>
      <p className="mt-2 text-sm text-[#6B4F4F]">{desc}</p>
    </div>
  );
}

function PricingCard({ title, price, color, items, filled }: any) {
  return (
    <div
      className={`rounded-xl p-6 shadow-sm text-center border border-[#D9C8BA]`}
      style={{ backgroundColor: color }}
    >
      <h3 className="font-semibold text-lg text-[#4B3A34]">{title}</h3>

      <p className="mt-3 text-3xl font-bold text-[#4B3A34]">{price}</p>

      <ul className="mt-5 text-sm text-[#6B4F4F] space-y-1 text-left inline-block mx-auto">
        {items.map((i: string) => (
          <li key={i}>• {i}</li>
        ))}
      </ul>

      <button
        className={`mt-6 w-full py-2 rounded-md transition-all border ${
          filled
            ? "bg-[#4B3A34] text-white border-[#4B3A34] hover:bg-[#3C2E2A]"
            : "border-[#4B3A34] text-[#4B3A34] hover:bg-[#4B3A34] hover:text-white"
        }`}
      >
        {filled ? "Book Now" : "Start"}
      </button>
    </div>
  );
}

function Testimonial({ quote, name, role }: any) {
  return (
    <div className="bg-white p-6 rounded-xl border border-[#D9C8BA] shadow-sm">
      <p className="text-[#6B4F4F] italic">“{quote}”</p>
      <p className="mt-4 font-semibold text-[#4B3A34]">
        {name} <span className="text-sm text-[#A68B7C]">— {role}</span>
      </p>
    </div>
  );
}

// function AccordionItem({ title, content }: any) {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="border-b border-[#D9C8BA] py-3">
//       <button
//         onClick={() => setOpen(!open)}
//         className="w-full flex items-center justify-between text-left"
//       >
//         <div className="text-[#4B3A34] font-medium">{title}</div>
//         <ChevronDown
//           className={`text-[#6B4F4F] transition ${open ? "rotate-180" : ""}`}
//         />
//       </button>

//       {open && <p className="mt-3 text-[#6B4F4F] text-sm">{content}</p>}
//     </div>
//   );
// }
