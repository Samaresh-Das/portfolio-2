import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AnimatedText = ({ text, className = '' }) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');

  return (
    <p ref={containerRef} className={className} style={{ display: 'flex', flexWrap: 'wrap' }}>
      {words.map((word, i) => {
        const chars = word.split('');
        return (
          <span key={i} style={{ display: 'inline-flex', marginRight: '0.25em' }}>
            {chars.map((char, j) => {
              // Calculate a simple relative position for each character
              // This is a simplified approach assuming evenly distributed chars.
              // For a more precise effect, you'd map each character index to a progress range.
              const charIndex = i * 10 + j; // Rough approximation for index
              const totalChars = text.length;
              const startProgress = charIndex / totalChars;
              const endProgress = startProgress + 0.1; // 10% overlap

              const opacity = useTransform(
                scrollYProgress,
                [Math.max(0, startProgress - 0.25), Math.min(1, endProgress + 0.25)],
                [0.4, 1]
              );

              return (
                <span key={j} style={{ position: 'relative', display: 'inline-block' }}>
                  {/* Invisible placeholder to maintain layout */}
                  <span style={{ opacity: 0 }}>{char}</span>
                  {/* Absolute animated character */}
                  <motion.span
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      opacity,
                    }}
                  >
                    {char}
                  </motion.span>
                </span>
              );
            })}
          </span>
        );
      })}
    </p>
  );
};

export default AnimatedText;
