"use client"

import { projectsData } from "@/lib/data";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from 'next/image';


type ProjectProps = (typeof projectsData)[number];

export default function Project({
  title,
  description,
  tags,
  imageUrl,
  link,
}: ProjectProps) {

const ref = useRef<HTMLDivElement>(null);
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ["0 1", "1.33 1"],
});
const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);


  return (
      <motion.div
          ref={ref}
          style={{
            scale: scaleProgress,
            opacity: opacityProgress,
          }}
          className="group mb-3 sm:mb-8 last:mb-0"
      >
        <section
            className="bg-gray-100 max-w-[42rem] border border-black/5 rounded-lg
      overflow-hidden sm:pr-8 relative mb-3 sm:mb-8 last:mb-0 even:pl-8
      hover:bg-gray-200 transition sm:group-even:pl-8 dark:text-white dark:bg-white/10 dark:hover:bg-white/20"
            onClick={() => {
              window.open(link, "_blank");
            }}
        >
          <div
              className="pt-4 pb-7 px-5 sm:pl-10 sm:pr-0 sm:pt-10 sm:max-w-[50%] flex
      flex-col h-full sm:group-even:ml-[18rem]"
          >
            <h3 className="text-2xl font-semibold">{title}</h3>

            {/* Display the image inline on mobile */}
            <Image
                src={imageUrl}
                alt="Project I worked on"
                quality={95}
                className="my-4 w-full rounded-md sm:hidden"
            />

            <p className="mt-2 leading-relaxed text-gray-700 dark:text-white/70">
              {description}
            </p>
            <ul className="flex flex-wrap mt-4 py-2 gap-2 sm:mt-auto">
              {tags.map((tag, index) => (
                  <li
                      className="bg-blue-500 dark:bg-black/[0.7] px-3 py-1 text-[0.7rem]
              uppercase tracking-wider text-white rounded-full dark:text-white/70"
                      key={index}
                  >
                    {tag}
                  </li>
              ))}
            </ul>
          </div>

          {/* Display the image absolutely positioned on laptops */}
          <Image
              src={imageUrl}
              alt="Project I worked on"
              quality={95}
              className="absolute hidden sm:block top-10 -right-40 w-[28.25rem] h-fit rounded-t-lg
      shadow-2xl group-even:right-[initial]
      group-even:-left-40
      group-hover:-translate-x-3
      group-hover:-translate-y-3
      group-hover:-rotate-2
      group-hover:scale-[1.04]
      group-even:group-hover:translate-x-3
      group-even:group-hover:-translate-y-3
      group-even:group-hover:rotate-2"
          />
        </section>
      </motion.div>
  )
}

