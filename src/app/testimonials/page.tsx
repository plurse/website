"use client";

import { ArrowRight, Quote, Star } from "lucide-react";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { motion, Variants } from "framer-motion";


type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar?: string;
  rating?: number;
  social?: { twitter?: string; linkedin?: string };
};

const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Amina Diallo",
    role: "Head of CX",
    company: "VoyagePay",
    quote:
      "Implementing the customer journey orchestration cut our time-to-value in half. Our NPS jumped within a quarter.",
    rating: 5,
    social: { linkedin: "#", twitter: "#" },
  },
  {
    id: "2",
    name: "Lucas Fernández",
    role: "VP Growth",
    company: "Mercurio Labs",
    quote:
      "We stitched together onboarding, support, and lifecycle marketing with one stack. It just works end-to-end.",
    rating: 5,
    avatar: "/photos/sataa.png",
  },
  {
    id: "3",
    name: "Priya Sharma",
    role: "Director of Product",
    company: "Northbeam Health",
    quote:
      "Visibility across the journey revealed exactly where customers stalled—and how to fix it fast.",
    rating: 4,
    social: { linkedin: "#" },
  },
  {
    id: "4",
    name: "Noah Williams",
    role: "Customer Success Lead",
    company: "Clearline",
    quote:
      "Playbooks and alerts help our team act before risk snowballs. Renewals feel predictable now.",
    rating: 5,
  },
  {
    id: "5",
    name: "Sofia Rossi",
    role: "Lifecycle Marketing",
    company: "Lumen",
    quote:
      "We launched multi-channel journeys without engineering handoffs. The speed is a game-changer.",
    rating: 5,
    avatar: "/photos/sataa.png",
  },
  {
    id: "6",
    name: "Ethan Chen",
    role: "Data & Analytics",
    company: "Helix",
    quote:
      "Attribution improved because journeys and events finally spoke the same language.",
    rating: 4,
  },
];

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const portraitVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: i * 0.15 },
  }),
};

function InitialsAvatar({ name }: { name: string }) {
  const initials = useMemo(() => {
    const parts = name.trim().split(" ");
    const a = parts[0]?.[0] ?? "";
    const b = parts[1]?.[0] ?? "";
    return (a + b).toUpperCase();
  }, [name]);

  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 text-sm font-semibold shadow ring-1 ring-black/5 md:h-14 md:w-14">
      {initials}
    </div>
  );
}

function Rating({ value = 5 }: { value?: number }) {
  return (
    <div className="flex items-center gap-1 text-amber-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < value ? "fill-current" : "opacity-20"}`}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ t, index }: { t: Testimonial; index: number }) {
  return (
    <motion.figure
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={cardVariants}
      className="group relative rounded-3xl border border-white/20 bg-white/40 p-6 shadow-sm transition-all duration-500 hover:shadow-lg hover:bg-white/60 backdrop-blur-xl dark:border-zinc-700 dark:bg-zinc-900/40"
    >
      <Quote className="absolute -top-3 -left-3 h-6 w-6 text-gray-200 dark:text-zinc-700" />
      <blockquote className="text-lg text-gray-800 leading-relaxed dark:text-zinc-200 tracking-tight">
        “{t.quote}”
      </blockquote>
      <figcaption className="mt-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {t.avatar ? (
            <Image
              src={t.avatar}
              alt={`${t.name}'s avatar`}
              width={48}
              height={48}
              className="h-12 w-12 rounded-full object-cover ring-1 ring-black/10"
            />
          ) : (
            <InitialsAvatar name={t.name} />
          )}
          <div>
            <div className="text-sm font-semibold text-gray-900 dark:text-zinc-100">
              {t.name}
            </div>
            <div className="text-xs text-gray-500 dark:text-zinc-400">
              {t.role}, {t.company}
            </div>
            {t.rating ? <div className="mt-2"><Rating value={t.rating} /></div> : null}
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          {t.social?.twitter && (
            <Link href={t.social.twitter} aria-label={`${t.name} on Twitter`} className="transition hover:text-sky-500">
              <FaTwitter className="h-5 w-5" />
            </Link>
          )}
          {t.social?.linkedin && (
            <Link href={t.social.linkedin} aria-label={`${t.name} on LinkedIn`} className="transition hover:text-sky-700">
              <FaLinkedin className="h-5 w-5" />
            </Link>
          )}
        </div>
      </figcaption>
    </motion.figure>
  );
}

function TestimonialsHero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 py-24 sm:py-32">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={portraitVariants}
        className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-300 rounded-full blur-3xl opacity-10"
      />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={portraitVariants}
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-300 rounded-full blur-3xl opacity-10"
      />

      <div className="mx-auto max-w-4xl px-6 lg:px-8 relative">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={headingVariants}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-wide text-gray-600 dark:text-zinc-400">
            Testimonials
          </p>
          <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Trusted by Leaders Across Industries
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-zinc-300 max-w-xl mx-auto leading-relaxed">
            Discover why professionals rely on our platform to streamline their customer journeys.
          </p>
          <motion.div className="mt-8" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <Link
              href="#stories"
              className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-gray-800 dark:bg-white dark:text-gray-900"
            >
              Read Success Stories
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default function TestimonialsPage() {
  return (
    <main className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-900 dark:to-zinc-950">
      <TestimonialsHero />

      <section id="stories" className="mx-auto max-w-7xl px-6 py-24 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={headingVariants}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Real Results Across the Customer Journey
          </h2>
          <p className="mt-6 text-lg text-gray-600 dark:text-zinc-300 leading-relaxed">
            From activation to expansion, teams leverage our platform to simplify orchestration and accelerate outcomes.
          </p>
        </motion.div>

        {/* Mobile: swipeable carousel */}
        <div className="mt-12 md:hidden">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-2 scrollbar-hide">
            {TESTIMONIALS.map((t, i) => (
              <div key={t.id} className="snap-center shrink-0 w-[85%]">
                <TestimonialCard t={t} index={i} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: grid */}
        <div className="mt-12 hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.id} t={t} index={i} />
          ))}
        </div>

        <motion.div className="mt-16 flex items-center justify-center" whileHover={{ scale: 1.05 }}>
          <Link
            href="#"
            className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-gray-800 dark:bg-white dark:text-gray-900"
          >
            Explore More Stories
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
