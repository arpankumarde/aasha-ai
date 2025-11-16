// import { Home as HomeIcon, Sparkles } from "lucide-react";

// const Page = () => {
//   return (
//     <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
//       <div className="text-center space-y-6 max-w-2xl px-6">
//         {/* Icon */}
//         <div className="flex justify-center">
//           <div className="relative">
//             <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#C7A896] to-[#8C6D5A] flex items-center justify-center shadow-lg">
//               <HomeIcon className="w-12 h-12 text-white" />
//             </div>
//             <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#F7EFE7] flex items-center justify-center shadow-md">
//               <Sparkles className="w-4 h-4 text-[#C7A896]" />
//             </div>
//           </div>
//         </div>

//         {/* Title */}
//         <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-b from-[#6B4F4F] to-[#4B3A34] bg-clip-text text-transparent">
//           Home Dashboard
//         </h1>

//         {/* Subtitle */}
//         <p className="text-xl text-[#8B5E34] font-medium">Coming Soon</p>

//         {/* Description */}
//         <p className="text-[#A68B7C] max-w-md mx-auto">
//           We're crafting a beautiful home experience for you. Your personalized
//           mental wellness dashboard will be here soon with insights, progress
//           tracking, and daily inspirations.
//         </p>

//         {/* Decorative Elements */}
//         <div className="flex items-center justify-center gap-2 pt-4">
//           <div className="w-2 h-2 rounded-full bg-[#C7A896]"></div>
//           <div className="w-2 h-2 rounded-full bg-[#B08F7A]"></div>
//           <div className="w-2 h-2 rounded-full bg-[#8C6D5A]"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;

"use client";
import {
  CalendarCheck,
  ChevronRight,
  Clock,
  HeartPulse,
  Leaf,
  MessageSquareHeart,
  NotebookPen,
  Smile,
  Sparkles,
  Target,
  Waves,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// --- Mock data ---
const moodData = [
  { day: "Mon", mood: 3 },
  { day: "Tue", mood: 4 },
  { day: "Wed", mood: 2 },
  { day: "Thu", mood: 5 },
  { day: "Fri", mood: 4 },
  { day: "Sat", mood: 3 },
  { day: "Sun", mood: 5 },
];

const sessions = [
  { time: "Today, 6:00 PM", with: "Dr. Anaya Kapoor", type: "CBT" },
  { time: "Tue, 9:30 AM", with: "Coach Liam", type: "Mindfulness" },
];

const heroStats = [
  { label: "Mindful streak", value: "12 days", helper: "+2 vs last week" },
  { label: "Avg mood today", value: "4.3 / 5", helper: "Stable & grounded" },
  { label: "Deep breaths logged", value: "36", helper: "Keep the rhythm" },
  {
    label: "Gratitude notes",
    value: "3 entries",
    helper: "Morning ritual done",
  },
];

const highlightMetrics = [
  {
    label: "Mindful minutes",
    value: "24 min",
    detail: "+6 min today",
    icon: Clock,
  },
  {
    label: "Energy balance",
    value: "80%",
    detail: "Calm & steady",
    icon: Leaf,
  },
  {
    label: "Journal streak",
    value: "5 days",
    detail: "Keep reflecting",
    icon: NotebookPen,
  },
];

// --- Small helpers ---
const BentoCard = ({ children, className = "" }) => (
  <Card
    className={`h-full rounded-3xl border border-[#E7D8C9] bg-white/80 shadow-[0_20px_60px_rgba(92,64,51,0.08)] backdrop-blur ${className}`}
  >
    <CardContent className="h-full p-5 sm:p-6">{children}</CardContent>
  </Card>
);

const SectionTitle = ({
  icon: Icon,
  title,
  action = null,
}: {
  icon: any;
  title: any;
  action?: any;
}) => (
  <div className="mb-3 flex items-center justify-between">
    <div className="flex items-center gap-2">
      <div className="rounded-xl bg-amber-100 p-2 text-amber-800">
        <Icon className="h-4 w-4" />
      </div>
      <h3 className="text-sm font-medium text-stone-800">{title}</h3>
    </div>
    {action}
  </div>
);

// --- Hero and highlight sections ---
const HeroSection = () => (
  <div className="col-span-12">
    <div className="relative overflow-hidden rounded-[32px] border border-amber-200/60 bg-gradient-to-r from-[#F5E1D3] via-[#F0D8C0] to-[#E9C7A6] px-6 py-7 shadow-[0_25px_60px_rgba(120,86,61,0.35)] sm:px-10">
      <div className="absolute inset-y-0 right-0 h-full w-1/2 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.35),transparent_60%)] opacity-70" />
      <div className="relative grid gap-8 md:grid-cols-[1.2fr_1fr]">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-amber-900/80">
            <Sparkles className="h-3.5 w-3.5" />
            Gentle focus
          </div>
          <h1 className="mt-4 text-3xl font-semibold text-[#4B3A34] sm:text-4xl">
            Your space is steady, calm, and ready for today.
          </h1>
          <p className="mt-3 text-sm text-[#6B4F4F]/80 sm:text-base">
            Track your rituals, lean on the assistant, and celebrate the
            micro-wins that keep your nervous system balanced.
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-[#6B4F4F]">
            {["Morning grounding", "Mindful movement", "Gratitude pulse"].map(
              (pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-white/50 bg-white/40 px-3 py-1 backdrop-blur-sm"
                >
                  {pill}
                </span>
              )
            )}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button className="rounded-2xl bg-white text-[#7B4E2C] shadow-sm hover:bg-white/90">
              Start live check-in
            </Button>
            <Button
              asChild
              className="rounded-2xl border-white/60 bg-[#7B4E2C]/90 hover:bg-[#7B4E2C]"
            >
              <Link href="/chat">
                Evening ritual plan
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {heroStats.map((stat, idx) => (
            <div
              key={stat.label}
              className="rounded-3xl border border-white/50 bg-white/30 p-4 text-sm text-[#6B4F4F] backdrop-blur"
            >
              <p className="text-xs font-medium uppercase tracking-widest text-[#6B4F4F]/70">
                {stat.label}
              </p>
              <p className="mt-2 text-2xl font-semibold text-[#4B3A34]">
                {stat.value}
              </p>
              <p className="text-xs text-[#775944]">{stat.helper}</p>
              <div className="mt-4 h-1.5 w-full rounded-full bg-white/40">
                <div
                  className="h-full rounded-full bg-[#B86B40]"
                  style={{ width: `${60 + idx * 10}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const HighlightsRow = () => (
  <div className="col-span-12 grid gap-4 md:grid-cols-3">
    {highlightMetrics.map((metric, idx) => (
      <BentoCard key={metric.label} className="relative overflow-hidden">
        <div className="absolute -top-10 right-0 h-32 w-32 rounded-full bg-amber-100/60 blur-3xl" />
        <div className="relative flex items-center gap-3">
          <div className="rounded-2xl bg-amber-100 p-3 text-amber-800 shadow-inner">
            <metric.icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
              {metric.label}
            </p>
            <p className="text-2xl font-semibold text-stone-800">
              {metric.value}
            </p>
            <p className="text-xs text-stone-500">{metric.detail}</p>
          </div>
        </div>
        <div className="mt-4 h-1.5 w-full rounded-full bg-stone-200">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#B2704E] to-[#E0AA7D]"
            style={{ width: `${65 + idx * 10}%` }}
          />
        </div>
      </BentoCard>
    ))}
  </div>
);

// --- Chat panel (top) ---
const ChatPanel = () => {
  const router = useRouter();
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    // Redirect to /chat with the typed message
    router.push(`/chat?msg=${encodeURIComponent(input)}`);

    setInput("");
  };
  return (
    <BentoCard className="col-span-12">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-amber-200 p-2 text-amber-900">
              <HeartPulse className="h-4 w-4" />
            </div>
            <div className="text-sm font-semibold text-stone-800">
              Aashaa Assistant
            </div>
          </div>
          <div className="text-xs text-stone-500">
            Be kind to yourself today ♡
          </div>
        </div>
        <div className="grid gap-2">
          <div className="max-w-xl rounded-xl bg-amber-50 p-3 text-sm text-stone-800">
            Hi! Want a 2‑minute grounding exercise?
          </div>
          <div className="ml-auto max-w-xl rounded-xl bg-stone-200 p-3 text-sm text-stone-800">
            Yes, and suggest an evening routine.
          </div>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          {[
            "Plan a shorter ritual",
            "Ask for a sleep story",
            "Note today’s gratitude",
          ].map((prompt) => (
            <button
              key={prompt}
              onClick={() => setInput(prompt)}
              className="rounded-full border border-stone-200 bg-white/80 px-3 py-1 text-stone-600 transition hover:border-amber-200 hover:text-stone-800"
            >
              {prompt}
            </button>
          ))}
        </div>
        <div className="mt-2 flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask anything…"
            className="flex-1 rounded-xl border border-stone-200 bg-white/90 px-3 py-2 text-sm outline-none placeholder:text-stone-400"
          />
          <Button
            className="rounded-xl bg-[#7B4E2C] text-amber-50 hover:bg-[#6B3F21]"
            onClick={handleSend}
          >
            Send
          </Button>
        </div>
      </div>
    </BentoCard>
  );
};

// --- Widgets (reduced to 2 rows) ---
const MoodTracker = () => (
  <BentoCard className="col-span-12 md:col-span-6 lg:col-span-4">
    <SectionTitle
      icon={Smile}
      title="Mood tracker"
      action={
        <Badge variant="secondary" className="bg-amber-100 text-amber-900">
          7‑day
        </Badge>
      }
    />
    <div className="h-36">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={moodData}
          margin={{ left: 0, right: 0, top: 10, bottom: 0 }}
        >
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            stroke="#78716c"
          />
          <YAxis hide domain={[0, 5]} />
          <Tooltip
            contentStyle={{
              background: "#fff",
              border: "1px solid #e7e5e4",
              color: "#44403c",
            }}
          />
          <Line
            type="monotone"
            dataKey="mood"
            stroke="#92400e"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
    <div className="mt-3 flex items-center justify-between text-sm text-stone-600">
      <span>Avg mood</span>
      <span className="font-semibold text-stone-800">4.0</span>
    </div>
  </BentoCard>
);

const DailyCheckIn = () => (
  <BentoCard className="col-span-12 md:col-span-6 lg:col-span-4">
    <SectionTitle
      icon={Sparkles}
      title="Daily check‑in"
      action={
        <Badge
          variant="secondary"
          className="rounded-full bg-amber-100 text-amber-900"
        >
          AM reset
        </Badge>
      }
    />
    <div className="grid gap-3">
      <div className="grid grid-cols-5 gap-2">
        {["😞", "🙁", "😐", "🙂", "😄"].map((m, i) => (
          <button
            key={i}
            className="rounded-2xl border border-stone-200 bg-gradient-to-b from-white to-[#FCF3E8] py-3 text-xl transition hover:-translate-y-0.5 hover:border-amber-200"
          >
            {m}
          </button>
        ))}
      </div>
      <textarea
        placeholder="Write a quick note about how you're feeling…"
        className="min-h-[84px] rounded-2xl border border-stone-200 bg-white/80 p-3 text-sm outline-none placeholder:text-stone-400"
      />
      <div className="flex items-center justify-between">
        <Button
          size="sm"
          className="rounded-2xl bg-[#7B4E2C] text-amber-50 hover:bg-[#6B3F21]"
        >
          Save check‑in
        </Button>
        <span className="text-xs text-stone-500">
          Streak: <span className="text-stone-800">5 days</span>
        </span>
      </div>
    </div>
  </BentoCard>
);

const BreathingCoach = () => (
  <BentoCard className="col-span-12 md:col-span-6 lg:col-span-4">
    <SectionTitle icon={Waves} title="Guided breathing" />
    <div className="flex h-36 items-center justify-center">
      <div className="relative h-28 w-28 animate-[pulse_4s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-[#E9CBB0] to-[#E3B488]">
        <div className="absolute inset-2 rounded-full bg-white/60 blur-2xl" />
        <div className="absolute inset-4 rounded-full border border-white/50" />
        <div className="absolute inset-6 flex items-center justify-center rounded-full border border-white/70">
          <span className="text-xs font-semibold text-[#7B4E2C]">
            4 • 4 • 4 • 4
          </span>
        </div>
      </div>
    </div>
    <div className="mt-3 grid grid-cols-3 gap-2">
      {["Box", "4‑7‑8", "Coherence"].map((l) => (
        <Button
          key={l}
          variant="secondary"
          className="rounded-2xl bg-amber-100 text-amber-900 hover:bg-amber-200"
          size="sm"
        >
          {l}
        </Button>
      ))}
    </div>
  </BentoCard>
);

const MeditationTimer = () => (
  <BentoCard className="col-span-12 md:col-span-6 lg:col-span-3">
    <SectionTitle icon={Clock} title="Meditation" />
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-[6px] border-stone-200" />
          <div className="absolute inset-0 rounded-full border-[6px] border-transparent border-t-[#B2704E]" />
          <div className="absolute inset-[6px] flex items-center justify-center rounded-full bg-white">
            <span className="text-xs font-semibold text-stone-600">Calm</span>
          </div>
        </div>
        <div>
          <div className="text-3xl font-semibold text-stone-800">12:00</div>
          <div className="text-xs text-stone-500">Guided • Calm body scan</div>
        </div>
      </div>
      <Button className="rounded-2xl bg-[#7B4E2C] text-amber-50 hover:bg-[#6B3F21]">
        Start
      </Button>
    </div>
  </BentoCard>
);

const UpcomingSessions = () => (
  <BentoCard className="col-span-12 md:col-span-6 lg:col-span-3">
    <SectionTitle icon={CalendarCheck} title="Upcoming sessions" />
    <div className="space-y-3">
      {sessions.map((s, i) => (
        <div
          key={i}
          className="rounded-2xl border border-stone-200/80 bg-white/70 p-3"
        >
          <div className="text-sm font-semibold text-stone-800">{s.time}</div>
          <div className="text-xs text-stone-500">
            {s.with} • {s.type}
          </div>
        </div>
      ))}
      <Button
        variant="secondary"
        className="w-full rounded-2xl bg-amber-100 text-amber-900 hover:bg-amber-200"
        size="sm"
      >
        Book a session
      </Button>
    </div>
  </BentoCard>
);

const JournalQuick = () => (
  <BentoCard className="col-span-12 lg:col-span-6">
    <SectionTitle
      icon={NotebookPen}
      title="Journal – quick entry"
      action={<Badge className="bg-amber-100 text-amber-900">Private</Badge>}
    />
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <textarea
          className="h-28 w-full rounded-2xl border border-stone-200 bg-white/90 p-3 text-sm outline-none placeholder:text-stone-400"
          placeholder="What's on your mind?"
        />
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            className="rounded-2xl bg-[#7B4E2C] text-amber-50 hover:bg-[#6B3F21]"
          >
            Add entry
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="rounded-2xl bg-amber-100 text-amber-900 hover:bg-amber-200"
          >
            Prompt
          </Button>
          <span className="text-xs text-stone-500">
            Last updated 3 mins ago
          </span>
        </div>
      </div>
      <div className="space-y-2">
        {["Gratitude", "Wins", "Worries"].map((tag) => (
          <div
            key={tag}
            className="flex items-center justify-between rounded-2xl border border-stone-200 bg-white/70 p-3 text-sm text-stone-800"
          >
            <span>{tag}</span>
            <Badge
              variant="secondary"
              className="rounded-full bg-amber-100 text-amber-900"
            >
              New
            </Badge>
          </div>
        ))}
      </div>
    </div>
  </BentoCard>
);

const GoalsWidget = () => (
  <BentoCard className="col-span-12 md:col-span-6 lg:col-span-3">
    <SectionTitle icon={Target} title="Goals & streaks" />
    <div className="space-y-3">
      {[
        { label: "Meditate 10m", progress: 70 },
        { label: "Journal 5x/week", progress: 40 },
        { label: "Walk 6k steps", progress: 85 },
      ].map((g, i) => (
        <div key={i}>
          <div className="mb-1 flex items-center justify-between text-sm text-stone-700">
            <span>{g.label}</span>
            <span>{g.progress}%</span>
          </div>
          <div className="h-2 rounded-full bg-stone-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#B2704E] to-[#E0AA7D]"
              style={{ width: `${g.progress}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  </BentoCard>
);

const NudgesWidget = () => (
  <BentoCard className="col-span-12 md:col-span-6 lg:col-span-3">
    <SectionTitle
      icon={MessageSquareHeart}
      title="Gentle nudges"
      action={<Switch />}
    />
    <div className="space-y-2 text-sm text-stone-800">
      <div className="rounded-2xl border border-stone-200 bg-gradient-to-r from-white to-[#FCF3E8] p-3">
        Time for a 2‑minute breathing break?
      </div>
      <div className="rounded-2xl border border-stone-200 bg-gradient-to-r from-white to-[#FCF3E8] p-3">
        Write one thing you’re grateful for.
      </div>
      <div className="rounded-2xl border border-stone-200 bg-gradient-to-r from-white to-[#FCF3E8] p-3">
        Wind‑down mode starts in 1 hour.
      </div>
    </div>
  </BentoCard>
);

// --- Page ---
export default function MentalWellnessDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF9F3] via-[#F7ECDE] to-[#F1E3D2] text-stone-900">
      {/* Top Bar */}
      <header className="sticky top-0 z-10 border-b border-stone-200/60 bg-[#FFF8F0]/80 backdrop-blur supports-[backdrop-filter]:bg-[#FFF8F0]/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-amber-200 p-2 text-amber-900">
              <HeartPulse className="h-5 w-5" />
            </div>
            <span className="text-sm font-semibold tracking-wide text-stone-800">
              Aashaa , Your mental wellness
            </span>
          </div>
          <div className="flex items-center gap-2">
            <input
              placeholder="Search exercises, notes, sessions…"
              className="w-72 rounded-2xl border border-white/60 bg-white/80 px-3 py-2 text-sm text-stone-700 shadow-inner outline-none placeholder:text-stone-400"
            />
            <Button
              className="rounded-2xl bg-[#7B4E2C] text-amber-50 hover:bg-[#6B3F21]"
              variant="secondary"
            >
              New entry
            </Button>
          </div>
        </div>
      </header>

      {/* Chat + 2-row Bento Grid */}
      <main className="mx-auto max-w-7xl px-4 py-6">
        <div className="mb-5 grid grid-cols-12 gap-4">
          <HeroSection />
        </div>

        <div className="mb-5 grid grid-cols-12 gap-4">
          <HighlightsRow />
        </div>

        {/* Chat Section */}
        <div className="mb-5 grid grid-cols-12 gap-4">
          <ChatPanel />
        </div>

        {/* Row 1 */}
        <div className="mb-5 grid grid-cols-12 gap-4">
          <MoodTracker />
          <DailyCheckIn />
          <BreathingCoach />
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-12 gap-4">
          <JournalQuick />
          <UpcomingSessions />
          <MeditationTimer />
          <GoalsWidget />
          <NudgesWidget />
        </div>

        <footer className="mt-6 flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} Serene</span>
            <span>•</span>
            <a className="hover:text-stone-700" href="#">
              Privacy
            </a>
            <a className="hover:text-stone-700" href="#">
              Terms
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Leaf className="h-4 w-4 text-amber-800" />
            <span>Take a mindful breath</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
