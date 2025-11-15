"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Check,
  ChevronDown,
  HeartHandshake,
  MessageCircle,
  Clock,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FEF4D6] text-slate-900">
      {/* NAV */}
      {/* <header className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-extrabold text-2xl">Aashaa</span>
          <span className="text-sm text-slate-700">Mental Wellness</span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-800">
          <Link href="#features">Features</Link>
          <Link href="#how">How it Works</Link>
          <Link href="#plans">Plans</Link>
          <Link href="#testimonials">Stories</Link>
          <Link href="#faq">FAQ</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-slate-800 hidden sm:inline">Log In</Link>
          <Link href="/signup">
            <Button className="bg-slate-900 text-white rounded-md px-4 py-2 text-sm">Sign Up</Button>
          </Link>
        </div>
      </header> */}

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* left text */}
          <div className="lg:col-span-7">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight max-w-2xl">
              Find calm & clarity with{" "}
              <span className="block">
                Aashaa — your mental wellness companion
              </span>
            </h1>

            <p className="mt-6 text-lg text-slate-700 max-w-2xl">
              Private, empathetic chats with an AI designed to listen — plus
              access to certified mentors when you need them. Gentle support,
              daily self-care nudges, and simple plans to help you feel lighter.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/chat">
                <button
                  className="inline-flex items-center gap-3 bg-slate-900 text-white px-5 py-3 rounded-md shadow
      transition-all duration-300 hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5"
                >
                  Start Chat
                </button>
              </Link>

              <Link href="/mentors">
                <button
                  className="inline-flex items-center gap-3 border border-slate-800 text-slate-800 px-5 py-3 rounded-md
      transition-all duration-300 hover:bg-slate-900 hover:text-white hover:shadow-lg hover:-translate-y-0.5"
                >
                  Book a Mentor
                </button>
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-6 items-center text-sm text-slate-700">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/60 shadow">
                  ✓
                </span>
                <span>Private & confidential</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/60 shadow">
                  ✓
                </span>
                <span>24/7 AI support</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div
              className="absolute -inset-y-6 right-0 w-3/4 md:w-full rounded-3xl overflow-hidden"
              aria-hidden
            >
              <div className="h-full w-full bg-[url('/images/hero-accent.png')] bg-cover bg-right/40 opacity-90" />
              {/* replace '/images/hero-accent.png' with your texture or illustration */}
            </div>

            <div className="relative mx-auto w-full md:w-[420px] rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-lg">
              {/* rounded cropped photo */}
              <Image
                src="https://cdn.prod.website-files.com/640f59825ad6d8a9545240ba/685db14b1329ed9dfa86c7a4_best-ai-mental-health-apps-for-2025.png"
                alt="Aashaa conversation"
                width={560}
                height={420}
                className="object-cover w-full h-80"
              />

              <div className="p-6">
                <h4 className="text-xl font-semibold text-slate-900">
                  Need to talk right now?
                </h4>
                <p className="mt-2 text-slate-700 text-sm">
                  Start a free chat with Aashaa's empathetic AI — or schedule a
                  call with a mentor.
                </p>

                <div className="mt-4 flex gap-3">
                  <Link href="/chat">
                    <button
                      className="bg-slate-900 text-white px-4 py-2 rounded-md text-sm
      transition-all duration-300 hover:bg-slate-800 hover:-translate-y-0.5 hover:shadow-md"
                    >
                      Chat now
                    </button>
                  </Link>

                  <Link href="/mentors">
                    <button
                      className="border border-slate-200 px-4 py-2 rounded-md text-sm text-slate-800
      transition-all duration-300 hover:bg-slate-900 hover:text-white hover:-translate-y-0.5 hover:shadow-md"
                    >
                      Schedule
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Intro short + checklist */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <h2 className="text-3xl font-bold text-slate-900">
              Private support, straightforward care
            </h2>
            <p className="mt-4 text-slate-700 max-w-2xl">
              Aashaa combines compassionate AI conversations with access to
              trained mentors. Reduce stress, get clarity, and build small
              routines that help you feel better every day.
            </p>

            <ul className="mt-6 space-y-3 text-slate-700">
              <li className="flex items-start gap-3">
                <Check className="mt-1 text-slate-900" /> Conversations that
                feel human
              </li>
              <li className="flex items-start gap-3">
                <Check className="mt-1 text-slate-900" /> Simple reminders &
                self-care nudges
              </li>
              <li className="flex items-start gap-3">
                <Check className="mt-1 text-slate-900" /> Book certified mentors
                when needed
              </li>
            </ul>

            <div className="mt-6">
              <Link href="/about">
                <button className="bg-white border border-slate-900 px-4 py-2 hover:bg-slate-900 hover:text-white hover:-translate-y-0.5 hover:shadow-md rounded-md">
                  Learn more
                </button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden bg-white border border-slate-100 p-6">
              {/* Replace with an app screenshot illustration */}
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

      {/* SECTION: features grid (rounded rectangles, alternating) */}
<section id="features" className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
  <div className="grid md:grid-cols-3 gap-6">

    <div className="transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <FeatureCard
        title="Empathetic AI Chat"
        desc="Private, always-available conversations designed to listen and reflect back with kindness."
        Icon={MessageCircle}
      />
    </div>

    <div className="transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <FeatureCard
        title="Certified Mentors"
        desc="Book short mentor sessions for focused support from trained professionals."
        Icon={HeartHandshake}
      />
    </div>

    <div className="transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <FeatureCard
        title="Reminders & Routines"
        desc="Set gentle nudges for self-care habits, sleep, and mindful breaks."
        Icon={Clock}
      />
    </div>

  </div>
</section>


      {/* PLANS (pricing-style) */}
      <section id="plans" className="max-w-7xl mx-auto px-6 lg:px-8 py-20">

  {/* LEFT SIDE TEXT */}
  <div className="grid md:grid-cols-2 gap-12 items-start">

    <div>
      <h2 className="text-3xl font-bold text-[#4B3A34]">
        Support that fits your journey with clear and simple pricing
      </h2>

      <p className="mt-4 text-[#6B4F4F] text-lg leading-relaxed">
        Aashaa offers flexible support options—from gentle AI conversations 
        to personalized mentor guidance. Choose what feels right for your emotional wellness, 
        without hidden costs or pressure.
      </p>

      <div className="mt-6">
        <Link href="/learn-more">
          <button className="px-6 py-2 text-white bg-[#6B4F4F] rounded-md hover:bg-[#5a4242] transition-all">
            Learn More
          </button>
        </Link>
      </div>
    </div>

    
    {/* RIGHT SIDE — SIMPLE 3 CARD GRID */}
<div className="grid md:grid-cols-3 gap-6">

  {/* CARD 1 */}
  <div className="rounded-xl border border-[#C9B8A8] bg-[#FCF8F4] p-6 shadow-sm text-center">
    <h3 className="font-semibold text-lg text-[#4B3A34]">Free Care</h3>

    <p className="mt-3 text-3xl font-bold text-[#4B3A34]">₹0</p>
    <p className="text-sm text-[#6B4F4F]">Forever free</p>

    <ul className="mt-5 text-sm text-[#6B4F4F] space-y-1 text-left inline-block">
      <li>• Unlimited AI chat</li>
      <li>• Daily affirmations</li>
      <li>• Emotional check-ins</li>
    </ul>

    <button className="mt-6 w-full border border-[#6B4F4F] text-[#6B4F4F] py-2 rounded-md hover:bg-[#6B4F4F] hover:text-white transition-all">
      Start Free
    </button>
  </div>

  {/* CARD 2 */}
  <div className="rounded-xl border border-[#C9B8A8] bg-white p-6 shadow-sm text-center">
    <h3 className="font-semibold text-lg text-[#4B3A34]">Mentor Session</h3>

    <p className="mt-3 text-3xl font-bold text-[#4B3A34]">₹499</p>
    <p className="text-sm text-[#6B4F4F]">Per session</p>

    <ul className="mt-5 text-sm text-[#6B4F4F] space-y-1 text-left inline-block">
      <li>• 45-min mentor call</li>
      <li>• Follow-up guidance</li>
      <li>• Personalized mental plan</li>
    </ul>

    <button className="mt-6 w-full bg-[#6B4F4F] text-white py-2 rounded-md hover:bg-[#5a4242] transition-all">
      Book Now
    </button>
  </div>

  {/* CARD 3 */}
  <div className="rounded-xl border border-[#C9B8A8] bg-[#F7EFE7] p-6 shadow-sm text-center">
    <h3 className="font-semibold text-lg text-[#4B3A34]">Monthly Care</h3>

    <p className="mt-3 text-3xl font-bold text-[#4B3A34]">₹1699</p>
    <p className="text-sm text-[#6B4F4F]">Per month</p>

    <ul className="mt-5 text-sm text-[#6B4F4F] space-y-1 text-left inline-block">
      <li>• 4 mentor calls</li>
      <li>• Unlimited AI chats</li>
      <li>• Weekly tasks</li>
      <li>• Priority support</li>
    </ul>

    <button className="mt-6 w-full border border-[#6B4F4F] text-[#6B4F4F] py-2 rounded-md hover:bg-[#6B4F4F] hover:text-white transition-all">
      Subscribe
    </button>
  </div>

</div>

  </div>
</section>
      

      {/* Testimonials rounded panel like Oyster */}
      <section
        id="testimonials"
        className="max-w-7xl mx-auto px-6 lg:px-8 py-12"
      >
        <div className="bg-white rounded-3xl p-10 shadow-lg border border-slate-100">
          <h2 className="text-3xl font-bold text-center">
            Stories from people who found calm
          </h2>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <Testimonial
              quote="When stress kept me awake, Aashaa’s chat helped me slow down and breathe. I felt heard."
              name="Priya S."
              role="Student"
            />
            <Testimonial
              quote="Mentor sessions were kind and practical — I learned a tiny routine that changed my days."
              name="Rohit K."
              role="Designer"
            />
            <Testimonial
              quote="Knowing I can chat any time is a relief. The app feels like a friend who listens."
              name="Sneha M."
              role="Product Manager"
            />
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Link href="/book">
              <button className="bg-slate-900 text-white px-6 py-2 rounded-md">
                Book a Demo
              </button>
            </Link>
            <Link href="/preview">
              <button className="border border-slate-300 px-6 py-2 rounded-md">
                Preview the Platform
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ rounded yellow box (Oyster-style) */}
      <section id="faq" className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="rounded-3xl bg-white border border-slate-100 p-10 shadow-sm">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                Frequently asked questions
              </h2>
              <p className="mt-3 text-slate-700">
                Quick answers about how Aashaa works and how to get started.
              </p>

              <div className="mt-6 space-y-4">
                <AccordionItem
                  title="What is Aashaa?"
                  content="Aashaa is a mental wellness companion offering private AI chats and access to certified mentors for focused support."
                />
                <AccordionItem
                  title="Is my chat private?"
                  content="Yes — conversations are private and stored securely according to our privacy policy."
                />
                <AccordionItem
                  title="Can I schedule a mentor session?"
                  content="Yes — you can book short mentor sessions for more personalized guidance."
                />
              </div>
            </div>

            <div className="flex justify-center">
              {/* illustration - replace with a gentle illustration */}
              <Image
                src="/images/faq-illustration.png"
                alt="FAQ"
                width={420}
                height={320}
              />
            </div>
          </div>
        </div>
      </section>

      {/* final CTA */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12 text-center">
        <h3 className="text-2xl font-bold">Ready to start feeling lighter?</h3>
        <p className="mt-2 text-slate-700">
          Begin a free chat or book a mentor — support is one click away.
        </p>
        <div className="mt-6 flex items-center justify-center gap-4">
          <Link href="/chat">
            <button className="bg-slate-900 text-white px-6 py-2 rounded-md">
              Start a Free Chat
            </button>
          </Link>
          <Link href="/signup">
            <button className="border border-slate-300 px-6 py-2 rounded-md">
              Create Account
            </button>
          </Link>
        </div>
      </section>

      {/* footer */}
      
    </div>
  );
}

/* ---------------- components ---------------- */

function FeatureCard({
  title,
  desc,
  Icon,
}: {
  title: string;
  desc: string;
  Icon: any;
}) {
  return (
    <div className="rounded-2xl p-6 bg-white border border-slate-100 shadow-sm">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#FEF4D6]">
        <Icon className="w-6 h-6 text-slate-900" />
      </div>
      <h4 className="mt-4 font-semibold text-slate-900">{title}</h4>
      <p className="mt-2 text-sm text-slate-700">{desc}</p>
    </div>
  );
}

function Testimonial({
  quote,
  name,
  role,
}: {
  quote: string;
  name: string;
  role?: string;
}) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-100">
      <p className="text-slate-700 italic">“{quote}”</p>
      <p className="mt-4 font-semibold text-slate-900">
        {name} <span className="text-sm text-slate-600">— {role}</span>
      </p>
    </div>
  );
}

/* Accordion */
function AccordionItem({ title, content }: { title: string; content: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 py-3">
      <button
        onClick={() => setOpen((s) => !s)}
        className="w-full flex items-center justify-between text-left"
      >
        <div className="text-slate-900 font-medium">{title}</div>
        <div className="text-slate-700">
          <ChevronDown
            className={`transition-transform ${
              open ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
      </button>

      {open && <div className="mt-3 text-slate-700 text-sm">{content}</div>}
    </div>
  );
}
