'use client';
import React, { useContext } from 'react';
import { useSectionInView } from '@/lib/hooks';
import SectionHeading from './section-heading';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { experiencesData } from '@/lib/data';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '@/context/theme-context';

export default function Experience() {
  const { ref } = useSectionInView('Experience');
  const {theme } = useTheme();

  return (
    <section
      ref={ref}
      id="experience"
      className="mb-28  scroll-mt-28 text-center sm:mb-40"
    >
      <SectionHeading>My education</SectionHeading>
      <VerticalTimeline lineColor=''>
        {experiencesData.map((item, index) => {
          // const { ref, inView } = useInView({
          //   triggerOnce: true,
          // });
          return (
            <div key={index} ref={ref} className="vertical-timeline-element">
              <VerticalTimelineElement
                contentStyle={{
                  
                  background:
                  theme === "light" ? "#f3f4f6" : "rgba(255, 255, 255, 0.05)",
                  color: '#000', 
                  boxShadow: 'none',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  textAlign: 'left',
                  padding: '1.3rem 2rem',
                }}
                dateClassName='dark'
                contentArrowStyle={{
                  borderRight:
                    theme === "light"
                      ? "0.4rem solid #9ca3af"
                      : "0.4rem solid rgba(255, 255, 255, 0.5)",
                }}
                // visible={inView}
                visible={true}

                // date={item.date}
                
             
                icon={item.icon}
              
                iconStyle={{
                  background:
                    theme === "light" ? "white" : "black",
                  fontSize: "1.5rem",
                }}
              >
            <h3 className="font-semibold capitalize dark:text-white/75">{item.title}</h3>
            <h3 className="font-normal dark:text-white/75 !mt-0">{item.subtitle}</h3>
            <p className="font-normal capitalize dark:text-white/75">{item.date}</p>

            <p className="!mt-1 !font-normal text-gray-700 dark:text-white/75 whitespace-pre-line">
                {item.description}</p>
              </VerticalTimelineElement>
            </div>
          );
        })}
      </VerticalTimeline>
    </section>
  );
}