import { motion, useInView, type Variants } from 'framer-motion';
import { useRef } from 'react';

interface AnimateOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  yOffset?: number;
}

export function AnimateOnScroll({
  children,
  delay = 0,
  className = '',
  yOffset = 20
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once: true, 
    amount: 0.1,
    margin: '0px 0px -50px 0px'
  });

  const variants: Variants = {
    hidden: { 
      opacity: 0, 
      y: yOffset,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        delay: delay
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
