import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Char = ({ char, index, total, scrollYProgress }) => {
  const startProgress = index / total;
  const endProgress = startProgress + 0.1;

  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, startProgress - 0.2), Math.min(1, endProgress + 0.2)],
    [0.2, 1]
  );

  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <span style={{ opacity: 0 }}>{char}</span>
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
};

const AnimatedText = ({ text, className = '' }) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');
  let charCounter = 0;

  return (
    <p ref={containerRef} className={className} style={{ display: 'flex', flexWrap: 'wrap' }}>
      {words.map((word, i) => {
        const chars = word.split('');
        return (
          <span key={i} style={{ display: 'inline-flex', marginRight: '0.25em' }}>
            {chars.map((char, j) => {
              const currentCounter = charCounter++;
              return (
                <Char
                  key={j}
                  char={char}
                  index={currentCounter}
                  total={text.length}
                  scrollYProgress={scrollYProgress}
                />
              );
            })}
          </span>
        );
      })}
    </p>
  );
};

export default AnimatedText;
