"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { CalendarDays, Star } from "lucide-react"

const mentors = [
  {
    id: 1,
    name: "Dr. Ananya Sharma",
    title: "Clinical Psychologist",
    experience: "8 years experience",
    rating: 4.9,
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    bio: "Specializes in anxiety, emotional healing, and relationship counselling. Calm, compassionate, and understanding.",
  },
  {
    id: 2,
    name: "Rahul Mehta",
    title: "Mindfulness Coach",
    experience: "6 years experience",
    rating: 4.8,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Helps individuals overcome stress through mindful practices and balanced thought management.",
  },
  {
    id: 3,
    name: "Dr. Priya Kapoor",
    title: "Therapist & Emotional Wellness Expert",
    experience: "10 years experience",
    rating: 5.0,
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    bio: "Known for empathetic listening and guided emotional release therapy. Focuses on personal growth and resilience.",
  },
  {
    id: 4,
    name: "Aarav Patel",
    title: "Cognitive Behavioral Therapist (CBT)",
    experience: "7 years experience",
    rating: 4.7,
    image: "https://randomuser.me/api/portraits/men/41.jpg",
    bio: "Expert in managing stress, intrusive thoughts, and improving self-confidence with CBT techniques.",
  },
]

export default function MentorsPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-sky-50 via-white to-sky-50 text-gray-800">
      {/* 🌿 Header Section */}
      <section className="text-center py-16 px-6 bg-linear-to-b from-white to-sky-50 border-b border-sky-100">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
          Meet Our <span className="text-sky-600">Mentors</span>
        </h1>
        <p className="max-w-2xl mx-auto text-gray-600 text-lg md:text-xl">
          Our certified professionals are here to guide you through your healing journey — with empathy, patience, and care.
        </p>
      </section>

      {/* 👩‍⚕️ Mentor Grid */}
      <section className="py-20 container px-6 md:px-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {mentors.map((mentor) => (
            <div
              key={mentor.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-sky-100 transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {/* Image */}
              <div className="relative w-full h-56 overflow-hidden">
                <Image
                  src={mentor.image}
                  alt={mentor.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Info */}
              <div className="p-6 flex flex-col grow">
                <h3 className="text-xl font-semibold text-gray-800">{mentor.name}</h3>
                <p className="text-sky-600 font-medium text-sm">{mentor.title}</p>
                <p className="text-gray-500 text-sm mt-1">{mentor.experience}</p>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-2 text-sky-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm text-gray-600">{mentor.rating.toFixed(1)}</span>
                </div>

                {/* Bio */}
                <p className="text-gray-600 text-sm mt-3 grow">{mentor.bio}</p>

                {/* Button */}
                <Button className="mt-6 bg-linear-to-b from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white rounded-full w-full flex items-center justify-center gap-2 shadow-md">
                  <CalendarDays className="w-4 h-4" />
                  Book Session
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 💬 Call-to-Action */}
      <section className="text-center py-16 bg-sky-100/50 border-t border-sky-100">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
          Begin your healing journey with our <span className="text-sky-600 font-bold">mentors</span> today 🌱
        </h2>
        <Button className="mt-6 bg-linear-to-b from-sky-500 to-sky-600 text-white px-8 py-3 rounded-full shadow-md hover:shadow-lg">
          Explore Sessions
        </Button>
      </section>
    </div>
  )
}
