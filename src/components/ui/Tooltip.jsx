import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';

export function TooltipProvider({ children, delayDuration = 100 }) {
  return children;
}

const TooltipContext = React.createContext({});

export function Tooltip({ children }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);
  const triggerRef = useRef(null);
  const delay = 100;

  const show = () => {
    timeoutRef.current = setTimeout(() => setOpen(true), delay);
  };
  const hide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(false);
  };

  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }, []);

  return (
    <TooltipContext.Provider value={{ open, show, hide, triggerRef }}>
      <span ref={triggerRef} className="relative inline-block" onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}>
        {children}
      </span>
    </TooltipContext.Provider>
  );
}

export function TooltipTrigger({ asChild, children }) {
  const child = React.Children.only(children);
  if (asChild && React.isValidElement(child)) {
    return child;
  }
  return children;
}

const VIEWPORT_PADDING = 12;

export function TooltipContent({ side = 'top', className = '', children }) {
  const { open, triggerRef } = React.useContext(TooltipContext);
  const contentRef = useRef(null);
  const [position, setPosition] = useState(null);

  useLayoutEffect(() => {
    if (!open) {
      setPosition(null);
      return;
    }
    if (!triggerRef?.current || !contentRef?.current) return;
    const trigger = triggerRef.current.getBoundingClientRect();
    const content = contentRef.current.getBoundingClientRect();
    const padding = VIEWPORT_PADDING;
    const viewportW = window.innerWidth;

    const centerX = trigger.left + trigger.width / 2;
    const minCenterX = padding + content.width / 2;
    const maxCenterX = viewportW - padding - content.width / 2;
    const left = Math.min(Math.max(centerX, minCenterX), maxCenterX);
    const top = side === 'top' ? trigger.top - content.height - 8 : trigger.bottom + 8;

    setPosition({ left, top });
  }, [open, side, triggerRef]);

  if (!open) return null;

  const contentEl = (
    <span
      ref={contentRef}
      role="tooltip"
      className={`fixed z-[9999] px-3 py-2 rounded-lg bg-deep border border-main text-body text-xs shadow-lg max-w-xs whitespace-normal ${
        side === 'top' ? '' : ''
      } ${className}`}
      style={
        position
          ? {
              left: position.left,
              top: position.top,
              transform: 'translateX(-50%)',
            }
          : { left: 0, top: 0, visibility: 'hidden' }
      }
    >
      {children}
    </span>
  );

  return createPortal(contentEl, document.body);
}
