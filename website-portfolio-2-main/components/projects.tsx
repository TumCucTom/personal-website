"use client"

import React, { useEffect, useRef } from 'react'
import SectionHeading from './section-heading'
import { projectsData } from '@/lib/data';
import Project from './project';
import { useInView} from 'react-intersection-observer'
import { useActiveSectionContext } from '@/context/active-section-context'
import { useSectionInView } from '@/lib/hooks';


export default function Projects() {
  const { ref } = useSectionInView("Projects", 0.6)

  return (
    <section ref={ref} id="projects" className='scroll-mt-28 mb-28'>
        <SectionHeading>My projects</SectionHeading>
        <div>
          <Project/>
        </div>
    </section>
  )
}

