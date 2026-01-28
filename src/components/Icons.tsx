import React from 'react';

interface IconProps {
  className?: string;
}

export const LowIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="low-shade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFB45C"></stop>
        <stop offset="100%" stopColor="#E1842E"></stop>
      </linearGradient>
    </defs>
    <rect x="6" y="14" rx="36" ry="36" width="84" height="68" fill="url(#low-shade)" stroke="#1A1A1A" strokeWidth="6"></rect>
    <circle cx="34" cy="42" r="7" fill="#1A1A1A"></circle>
    <circle cx="62" cy="42" r="7" fill="#1A1A1A"></circle>
    <circle cx="32" cy="40" r="2.5" fill="#FFFFFF"></circle>
    <circle cx="60" cy="40" r="2.5" fill="#FFFFFF"></circle>
    <ellipse cx="26" cy="52" rx="6" ry="4" fill="#FF9A6B" opacity="0.6"></ellipse>
    <ellipse cx="70" cy="52" rx="6" ry="4" fill="#FF9A6B" opacity="0.6"></ellipse>
    <path d="M36 58 Q48 56 60 58" stroke="#1A1A1A" strokeWidth="5" fill="none"></path>
  </svg>
);

export const SadIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="sad-shade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F06A63"></stop>
        <stop offset="100%" stopColor="#C9443E"></stop>
      </linearGradient>
    </defs>
    <rect x="6" y="14" rx="36" ry="36" width="84" height="68" fill="url(#sad-shade)" stroke="#1A1A1A" strokeWidth="6"></rect>
    <circle cx="34" cy="42" r="7" fill="#1A1A1A"></circle>
    <circle cx="62" cy="42" r="7" fill="#1A1A1A"></circle>
    <circle cx="32" cy="40" r="2.5" fill="#FFFFFF"></circle>
    <circle cx="60" cy="40" r="2.5" fill="#FFFFFF"></circle>
    <ellipse cx="26" cy="52" rx="6" ry="4" fill="#FF8A8A" opacity="0.7"></ellipse>
    <ellipse cx="70" cy="52" rx="6" ry="4" fill="#FF8A8A" opacity="0.7"></ellipse>
    <path d="M34 60 Q48 54 62 60" stroke="#1A1A1A" strokeWidth="5" fill="none"></path>
  </svg>
);

export const NeutralIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="neutral-shade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFE777"></stop>
        <stop offset="100%" stopColor="#E6C83A"></stop>
      </linearGradient>
    </defs>
    <rect x="6" y="14" rx="36" ry="36" width="84" height="68" fill="url(#neutral-shade)" stroke="#1A1A1A" strokeWidth="6"></rect>
    <circle cx="34" cy="42" r="7" fill="#1A1A1A"></circle>
    <circle cx="62" cy="42" r="7" fill="#1A1A1A"></circle>
    <circle cx="32" cy="40" r="2.5" fill="#FFFFFF"></circle>
    <circle cx="60" cy="40" r="2.5" fill="#FFFFFF"></circle>
    <ellipse cx="26" cy="52" rx="6" ry="4" fill="#FFD966" opacity="0.5"></ellipse>
    <ellipse cx="70" cy="52" rx="6" ry="4" fill="#FFD966" opacity="0.5"></ellipse>
    <line x1="38" y1="58" x2="58" y2="58" stroke="#1A1A1A" strokeWidth="5" strokeLinecap="round"></line>
  </svg>
);

export const GoodIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="good-shade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#7EF09A"></stop>
        <stop offset="100%" stopColor="#3DBE63"></stop>
      </linearGradient>
    </defs>
    <rect x="6" y="14" rx="36" ry="36" width="84" height="68" fill="url(#good-shade)" stroke="#1A1A1A" strokeWidth="6"></rect>
    <circle cx="34" cy="42" r="7" fill="#1A1A1A"></circle>
    <circle cx="62" cy="42" r="7" fill="#1A1A1A"></circle>
    <circle cx="32" cy="40" r="2.5" fill="#FFFFFF"></circle>
    <circle cx="60" cy="40" r="2.5" fill="#FFFFFF"></circle>
    <ellipse cx="26" cy="52" rx="6" ry="4" fill="#FF9AA2" opacity="0.55"></ellipse>
    <ellipse cx="70" cy="52" rx="6" ry="4" fill="#FF9AA2" opacity="0.55"></ellipse>
    <path d="M36 56 Q48 62 60 56" stroke="#1A1A1A" strokeWidth="5" fill="none"></path>
  </svg>
);

export const LovelyIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="lovely-shade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#6FEFA6"></stop>
        <stop offset="100%" stopColor="#4ED97E"></stop>
      </linearGradient>
      <path
        id="heartShape"
        d=" M48 86 C18 64, 8 42, 18 28 C26 16, 42 18, 48 30 C54 18, 70 16, 78 28 C88 42, 78 64, 48 86 Z "
      ></path>
      <clipPath id="heartClip">
        <use href="#heartShape"></use>
      </clipPath>
    </defs>
    <use href="#heartShape" fill="url(#lovely-shade)" stroke="#FF4D6D" strokeWidth="3" strokeLinejoin="round"></use>
    <g clipPath="url(#heartClip)">
      <ellipse cx="28" cy="54" rx="6" ry="4" fill="#FF9AA2" opacity="0.65"></ellipse>
      <ellipse cx="68" cy="54"rx="6" ry="4" fill="#FF9AA2" opacity="0.65"></ellipse>
    </g>
    <circle cx="36" cy="42" r="7" fill="#1A1A1A"></circle>
    <circle cx="60" cy="42" r="7" fill="#1A1A1A"></circle>
    <circle cx="34" cy="40" r="2.5" fill="#FFFFFF"></circle>
    <circle cx="58" cy="40" r="2.5" fill="#FFFFFF"></circle>
    <path d="M34 60 Q48 70 62 60" stroke="#1A1A1A" strokeWidth="5" fill="none" strokeLinecap="round"></path>
  </svg>
);
