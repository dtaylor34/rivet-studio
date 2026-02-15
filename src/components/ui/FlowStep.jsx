import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './Tooltip';

/* Flow chart styles matching Google XP Product Flow: dark charcoal default, light grey highlight, blue ring when active */
const variantStyles = {
  default: 'rounded-md bg-surface text-body border border-main hover:bg-overlay/10 hover:text-heading hover:border-subtle',
  highlight: 'rounded-md bg-heading text-base font-semibold border border-heading shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:bg-heading/80 hover:border-heading/80',
  secondary: 'rounded-full bg-surface text-body border border-main hover:bg-overlay/10 hover:text-heading hover:border-subtle',
  ghost: 'rounded-md bg-transparent text-faint border border-dashed border-main hover:border-subtle hover:text-body',
};

export function FlowStep({
  label,
  isActive = false,
  onClick,
  className = '',
  variant = 'default',
  showArrowRight = false,
  showArrowLeft = false,
  description,
}) {
  const baseStyles = 'relative flex items-center justify-center px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer select-none';
  const activeStyles = isActive ? 'ring-2 ring-subtle' : '';
  const variantClass = variantStyles[variant] || variantStyles.default;

  const content = (
    <div
      className={`${baseStyles} ${variantClass} ${activeStyles} ${className}`}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(); } }}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {showArrowLeft && (
        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 opacity-50 pointer-events-none" aria-hidden>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
        </div>
      )}
      <span className="truncate max-w-full block text-center">{label}</span>
      {showArrowRight && (
        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 opacity-50 pointer-events-none" aria-hidden>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
        </div>
      )}
    </div>
  );

  if (!description) {
    return content;
  }

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          {content}
        </TooltipTrigger>
        <TooltipContent side="top" className="!max-w-md !px-4 !py-3 !rounded-lg text-left bg-deep border border-main text-body shadow-lg">
          <div className="font-semibold text-heading mb-1">{label}</div>
          <p className="text-xs leading-relaxed text-muted">{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
