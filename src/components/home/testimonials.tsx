"use client";

import { motion, Variants, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface Testimonial {
  name: string;
  role: string;
  feedback: string;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sataa's Plumbing",
    role: "Plumbing Shop",
    feedback:
      "Activity logging ensures we never miss a detail. Plurse keeps us in control.",
    avatar: "/photos/sataa.png",
  },
  {
    name: "Michy's Empire",
    role: "Beautician",
    feedback:
      "The real-time updates eliminated errors in our inventory. Plurse is a must-have!",
    avatar: "/photos/michy.jpg",
  },
  {
    name: "Life Spring",
    role: "Pharmacy",
    feedback:
      "Customer tracking has strengthened our client relationships. Plurse delivers!",
    avatar: "/photos/lifespring.png",
  },
];

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.15 },
  }),
};

const decorVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 0.1,
    scale: 1,
    transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    if (sliderRef.current) {
      const cardWidth =
        sliderRef.current.querySelector(".testimonial-card")?.clientWidth || 0;
      const scrollAmount = cardWidth * index;
      sliderRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
      setCurrentIndex(index);
      setIsPaused(true);
      setTimeout(() => setIsPaused(false), 10000);
    }
  };

  useEffect(() => {
    if (isPaused || !sliderRef.current) return;
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % testimonials.length;
      scrollToIndex(nextIndex);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, currentIndex]);

  return (
    <section
      ref={ref}
      className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-900 dark:to-zinc-950 py-24 sm:py-32 overflow-hidden"
    >
      {/* Decorative background */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={decorVariants}
        className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-300 rounded-full blur-3xl opacity-10"
      />
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={decorVariants}
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-300 rounded-full blur-3xl opacity-10"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        {/* Heading */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headingVariants}
          className="text-center space-y-4 mb-12"
        >
          <h2 className="text-5xl sm:text-6xl font-semibold text-gray-900 dark:text-white tracking-tight">
            What Our Users Say
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Discover how Plurse empowers businesses with seamless inventory and customer management.
          </p>
        </motion.div>

        {/* Slider */}
        <div
          className="mt-12 relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            ref={sliderRef}
            className="flex overflow-x-hidden snap-x snap-mandatory gap-6"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                className="testimonial-card flex-shrink-0 w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1rem)]"
              >
                <div className="bg-white/70 dark:bg-zinc-900/50 backdrop-blur-xl rounded-3xl shadow-md p-8 h-full flex flex-col items-center text-center border border-white/20 dark:border-zinc-800 transition-all duration-500 hover:shadow-xl hover:bg-white/90 dark:hover:bg-zinc-900/70">
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-6 ring-2 ring-white/50 shadow-md">
                    {t.avatar ? (
                      <Image
                        src={t.avatar}
                        alt={`${t.name}'s avatar`}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-zinc-700 text-gray-600 dark:text-zinc-300 text-xl font-semibold">
                        {t.name[0]}
                      </div>
                    )}
                  </div>
                  <p className="text-lg text-gray-800 dark:text-zinc-200 leading-relaxed flex-1">
                    “{t.feedback}”
                  </p>
                  <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white tracking-tight">
                    {t.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-zinc-400">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation */}
          <button
            onClick={() => scrollToIndex(Math.max(currentIndex - 1, 0))}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-zinc-800/80 backdrop-blur-md rounded-full p-3 shadow-md hover:scale-105 transition"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} className="text-gray-900 dark:text-white" />
          </button>
          <button
            onClick={() => scrollToIndex(Math.min(currentIndex + 1, testimonials.length - 1))}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-zinc-800/80 backdrop-blur-md rounded-full p-3 shadow-md hover:scale-105 transition"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} className="text-gray-900 dark:text-white" />
          </button>

          {/* Pagination dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === i
                    ? "bg-gray-900 dark:bg-white w-5"
                    : "bg-gray-400 dark:bg-zinc-600 w-2"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        {/* <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={buttonVariants}
          className="mt-16 text-center"
        >
          <motion.a
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            href="/testimonials"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gray-900 text-white text-sm font-semibold tracking-tight shadow-md hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-zinc-200 transition"
          >
            Explore More Stories
          </motion.a>
        </motion.div> */}
      </div>
    </section>
  );
}
