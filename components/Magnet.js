import { useRef, useState } from 'react';

const Magnet = ({ children, padding = 100, disabled = false, strength = 0.5 }) => {
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const magnetRef = useRef(null);

  const handleMouseMove = (e) => {
    if (disabled || !magnetRef.current) return;

    const { clientX, clientY } = e;
    const { width, height, left, top } = magnetRef.current.getBoundingClientRect();
    
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    // Check if within padding distance
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    const maxDistance = Math.max(width, height) / 2 + padding;

    if (distance < maxDistance) {
      setIsActive(true);
      setPosition({ x: distanceX * strength, y: distanceY * strength });
    } else {
      setIsActive(false);
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setIsActive(false);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={magnetRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isActive ? 'transform 0.3s ease-out' : 'transform 0.6s ease-in-out',
        willChange: 'transform',
        display: 'inline-block',
      }}
    >
      {children}
    </div>
  );
};

export default Magnet;
