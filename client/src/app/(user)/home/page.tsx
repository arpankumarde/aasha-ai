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
import { Progress } from "@/components/ui/progress";
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
import { useEffect , useState} from "react";
import { useRouter } from "next/navigation";

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

// --- Small helpers ---
const BentoCard = ({ children, className = "" }) => (
  <Card className={`h-full border-stone-300/70 bg-[#FFF9F0] ${className}`}>
    <CardContent className="h-full p-4 sm:p-5">{children}</CardContent>
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
          <div className="rounded-lg bg-amber-200 p-2 text-amber-900"><HeartPulse className="h-4 w-4" /></div>
          <div className="text-sm font-semibold text-stone-800">Aashaa Assistant</div>
        </div>
        <div className="text-xs text-stone-500">Be kind to yourself today ♡</div>
      </div>
      <div className="grid gap-2">
        <div className="max-w-xl rounded-xl bg-amber-50 p-3 text-sm text-stone-800">Hi! Want a 2‑minute grounding exercise?</div>
        <div className="ml-auto max-w-xl rounded-xl bg-stone-200 p-3 text-sm text-stone-800">Yes, and suggest an evening routine.</div>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask anything…"
          className="flex-1 rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm outline-none placeholder:text-stone-400"
        />
        <Button className="rounded-xl bg-amber-700 text-amber-50 hover:bg-amber-800">Send</Button>
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
      action={<Badge variant="secondary" className="bg-amber-100 text-amber-900">7‑day</Badge>}
    />
    <div className="h-36">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={moodData} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
          <XAxis dataKey="day" tickLine={false} axisLine={false} stroke="#78716c" />
          <YAxis hide domain={[0, 5]} />
          <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e7e5e4", color: "#44403c" }} />
          <Line type="monotone" dataKey="mood" stroke="#92400e" strokeWidth={2} dot={false} />
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
    <SectionTitle icon={Sparkles} title="Daily check‑in" />
    <div className="grid gap-3">
      <div className="grid grid-cols-5 gap-2">
        {["😞","🙁","😐","🙂","😄"].map((m,i)=> (
          <button key={i} className="rounded-xl border border-stone-300 bg-white py-3 text-xl hover:bg-stone-50">{m}</button>
        ))}
      </div>
      <textarea
        placeholder="Write a quick note about how you're feeling…"
        className="min-h-[84px] rounded-xl border border-stone-300 bg-white p-3 text-sm outline-none placeholder:text-stone-400"
      />
      <div className="flex items-center justify-between">
        <Button size="sm" className="rounded-xl bg-amber-700 text-amber-50 hover:bg-amber-800">Save check‑in</Button>
        <span className="text-xs text-stone-500">Streak: <span className="text-stone-800">5 days</span></span>
      </div>
    </div>
  </BentoCard>
);

const BreathingCoach = () => (
  <BentoCard className="col-span-12 md:col-span-6 lg:col-span-4">
    <SectionTitle icon={Waves} title="Guided breathing" />
    <div className="flex h-36 items-center justify-center">
      <div className="relative h-24 w-24 animate-pulse rounded-full border border-amber-300">
        <div className="absolute inset-2 rounded-full border border-amber-300/70" />
        <div className="absolute inset-4 rounded-full border border-amber-300/50" />
      </div>
    </div>
    <div className="mt-3 grid grid-cols-3 gap-2">
      {["Box","4‑7‑8","Coherence"].map((l)=> (
        <Button key={l} variant="secondary" className="rounded-xl bg-amber-100 text-amber-900 hover:bg-amber-200" size="sm">{l}</Button>
      ))}
    </div>
  </BentoCard>
);

const MeditationTimer = () => (
  <BentoCard className="col-span-12 md:col-span-6 lg:col-span-3">
    <SectionTitle icon={Clock} title="Meditation" />
    <div className="flex items-center justify-between">
      <div>
        <div className="text-3xl font-semibold text-stone-800">12:00</div>
        <div className="text-xs text-stone-500">Guided • Calm body scan</div>
      </div>
      <Button className="rounded-xl bg-amber-700 text-amber-50 hover:bg-amber-800">Start</Button>
    </div>
  </BentoCard>
);

const UpcomingSessions = () => (
  <BentoCard className="col-span-12 md:col-span-6 lg:col-span-3">
    <SectionTitle icon={CalendarCheck} title="Upcoming sessions" />
    <div className="space-y-3">
      {sessions.map((s, i) => (
        <div key={i} className="rounded-xl border border-stone-300 p-3">
          <div className="text-sm font-medium text-stone-800">{s.time}</div>
          <div className="text-xs text-stone-600">{s.with} • {s.type}</div>
        </div>
      ))}
      <Button variant="secondary" className="w-full rounded-xl bg-amber-100 text-amber-900 hover:bg-amber-200" size="sm">Book a session</Button>
    </div>
  </BentoCard>
);

const JournalQuick = () => (
  <BentoCard className="col-span-12 lg:col-span-6">
    <SectionTitle icon={NotebookPen} title="Journal – quick entry" action={<Badge className="bg-amber-100 text-amber-900">Private</Badge>} />
    <div className="grid gap-3 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <textarea className="h-28 w-full rounded-xl border border-stone-300 bg-white p-3 text-sm outline-none placeholder:text-stone-400" placeholder="What's on your mind?" />
        <div className="mt-3 flex items-center gap-2">
          <Button size="sm" className="rounded-xl bg-amber-700 text-amber-50 hover:bg-amber-800">Add entry</Button>
          <Button variant="secondary" size="sm" className="rounded-xl bg-amber-100 text-amber-900 hover:bg-amber-200">Prompt</Button>
        </div>
      </div>
      <div className="space-y-2">
        {["Gratitude","Wins","Worries"].map((tag)=> (
          <div key={tag} className="flex items-center justify-between rounded-xl border border-stone-300 p-3 text-sm text-stone-800">
            <span>{tag}</span>
            <Badge variant="secondary" className="bg-amber-100 text-amber-900">New</Badge>
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
          <div className="mb-1 flex items-center justify-between text-sm text-stone-700"><span>{g.label}</span><span>{g.progress}%</span></div>
          <Progress value={g.progress} className="h-2" />
        </div>
      ))}
    </div>
  </BentoCard>
);

const NudgesWidget = () => (
  <BentoCard className="col-span-12 md:col-span-6 lg:col-span-3">
    <SectionTitle icon={MessageSquareHeart} title="Gentle nudges" action={<Switch />} />
    <div className="space-y-2 text-sm text-stone-800">
      <div className="rounded-xl border border-stone-300 p-3">Time for a 2‑minute breathing break?</div>
      <div className="rounded-xl border border-stone-300 p-3">Write one thing you’re grateful for.</div>
      <div className="rounded-xl border border-stone-300 p-3">Wind‑down mode starts in 1 hour.</div>
    </div>
  </BentoCard>
);

// --- Page ---
export default function MentalWellnessDashboard() {
  return (
    <div className="min-h-screen  text-stone-900">
      {/* Top Bar */}
      <header className="sticky top-0 z-10 border-b border-stone-300/70 bg-[#F6F0E6]/80 backdrop-blur supports-[backdrop-filter]:bg-[#F6F0E6]/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-amber-200 p-2 text-amber-900"><HeartPulse className="h-5 w-5" /></div>
            <span className="text-sm font-semibold tracking-wide text-stone-800">Aashaa , Your mental wellness</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              placeholder="Search exercises, notes, sessions…"
              className="w-72 rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm outline-none placeholder:text-stone-400"
            />
            <Button className="rounded-xl bg-amber-700 text-amber-50 hover:bg-amber-800" variant="secondary">New entry</Button>
          </div>
        </div>
      </header>

      {/* Chat + 2-row Bento Grid */}
      <main className="mx-auto max-w-7xl px-4 py-6">
        {/* Chat Section */}
        <div className="mb-4 grid grid-cols-12 gap-4">
          <ChatPanel />
        </div>

        {/* Row 1 */}
        <div className="mb-4 grid grid-cols-12 gap-4">
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
            <a className="hover:text-stone-700" href="#">Privacy</a>
            <a className="hover:text-stone-700" href="#">Terms</a>
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
