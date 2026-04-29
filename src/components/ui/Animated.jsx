import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Animated.css';

/**
 * Componente wrapper para animações de entrada
 * Suporta diferentes tipos de animação e direções
 */
export default function Animated({
  children,
  animation = 'fadeInUp',
  delay = 0,
  duration = 600,
  trigger = true,
  className = '',
  style = {},
  ...props
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!trigger) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, trigger]);

  const animationClass = isVisible ? `animated animated--${animation}` : 'animated animated--hidden';

  return (
    <div
      className={`${animationClass} ${className}`}
      style={{
        '--animation-duration': `${duration}ms`,
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}

Animated.propTypes = {
  children: PropTypes.node.isRequired,
  animation: PropTypes.oneOf([
    'fadeIn',
    'fadeInUp',
    'fadeInDown',
    'fadeInLeft',
    'fadeInRight',
    'slideInUp',
    'slideInDown',
    'slideInLeft',
    'slideInRight',
    'scaleIn',
    'bounceIn'
  ]),
  delay: PropTypes.number,
  duration: PropTypes.number,
  trigger: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object
};