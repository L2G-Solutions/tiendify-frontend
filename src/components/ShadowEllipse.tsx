'use client';
import { useId } from 'react';
import { twMerge } from 'tailwind-merge';

interface IShadowEllipseProps {
  size: number | string;
  internalColor: string;
  externalColor: string;
  internalStopColor: string;
  externalStopColor: string;
  className?: string;
}

const ShadowEllipse = ({
  size,
  className,
  internalColor,
  externalColor,
  internalStopColor,
  externalStopColor,
}: IShadowEllipseProps) => {
  const filterId = useId();
  const gradientId = useId();
  const effectBlurId = useId();

  return (
    <div
      className={twMerge(`w-[${size}] h-[${size}] rounded-full backdrop-blur-[4px] -z-50`, className)}
      style={{
        fill: `radial-gradient(50% 50% at 50% 50%, ${internalColor} 0%, ${externalColor} 100%)`,
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="720" height="720" viewBox="0 0 720 720" fill="none">
        <g opacity="0.4" filter={`url(#${filterId})`}>
          <path
            d="M720 360C720 558.823 558.823 720 360 720C161.177 720 0 558.823 0 360C0 161.177 161.177 0 360 0C558.823 0 720 161.177 720 360Z"
            fill={`url(#${gradientId})`}
            fillOpacity="0.4"
          />
        </g>
        <defs>
          <filter
            id={filterId}
            x="-8"
            y="-8"
            width="736"
            height="736"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feGaussianBlur in="BackgroundImageFix" stdDeviation="4" />
            <feComposite in2="SourceAlpha" operator="in" result={effectBlurId} />
            <feBlend mode="normal" in="SourceGraphic" in2={effectBlurId} result="shape" />
          </filter>
          <radialGradient
            id={gradientId}
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(360 360) rotate(90) scale(360)"
          >
            <stop stopColor={internalStopColor} />
            <stop offset="1" stopColor={externalStopColor} stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

export default ShadowEllipse;
