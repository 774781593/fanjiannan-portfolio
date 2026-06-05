"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { TiltCard } from "@/components/TiltCard";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.75, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/projects/${project.slug}`} className="block">
        <TiltCard className="group relative overflow-hidden rounded-[18px] border border-line bg-panel shadow-soft">
          <div className="relative aspect-[1.22] overflow-hidden bg-black">
            <Image
              src={project.cover}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition duration-700 group-hover:scale-[1.04]"
            />
          </div>
          <div className="relative z-20 border-t border-line bg-[#151515]/86 p-6 backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between text-xs uppercase text-muted">
              <span>{project.eyebrow}</span>
              <span>{project.year}</span>
            </div>
            <h3 className="text-2xl font-bold tracking-[0] text-ink">{project.title}</h3>
            <p className="mt-3 max-w-md text-sm leading-6 text-muted">{project.summary}</p>
          </div>
        </TiltCard>
      </Link>
    </motion.article>
  );
}
