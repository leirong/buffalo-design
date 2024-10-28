import React from "react";
import {
  useState,
  useRef,
  PropsWithChildren,
  CSSProperties,
  cloneElement,
  isValidElement,
  useMemo,
} from "react";
import {
  useFloating,
  useInteractions,
  useHover,
  useClick,
  useDismiss,
  flip,
  arrow,
  offset,
  FloatingArrow,
} from "@floating-ui/react";
// import "./index.css";
import { createPortal } from "react-dom";
import { isFragment } from "../utils/reactNode";
type Alignment = "start" | "end";
type Side = "top" | "right" | "bottom" | "left";
type AlignedPlacement = `${Side}-${Alignment}`;
export interface PopoverProps extends PropsWithChildren {
  className?: string;
  style?: CSSProperties;
  children: React.ReactNode;
  title?: React.ReactNode;
  content?: React.ReactNode;
  trigger?: "click" | "hover";
  placement?: Side | AlignedPlacement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function Popover({
  className,
  style,
  children,
  title,
  content,
  trigger = "hover",
  placement = "top",
  open = false,
  onOpenChange,
}: PopoverProps) {
  const el = useMemo(() => {
    const el = document.createElement("div");
    el.className = "buffalo-popover-container";
    document.body.appendChild(el);
    return el;
  }, []);
  const [isOpen, setIsOpen] = useState(open);
  const arrowRef = useRef(null);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: (open) => {
      setIsOpen(open);
      onOpenChange?.(open);
    },
    placement,
    middleware: [
      flip(),
      offset(14),
      arrow({
        element: arrowRef,
      }),
    ],
  });

  const interaction =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    trigger === "hover" ? useHover(context) : useClick(context);

  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([
    interaction,
    dismiss,
  ]);
  const floating = isOpen && (
    <div
      className="buffalo-popover"
      ref={refs.setFloating}
      style={floatingStyles}
      {...getFloatingProps()}
    >
      <FloatingArrow
        className="buffalo-popover-arrow"
        ref={arrowRef}
        context={context}
        fill="#ffffff"
      />
      <div className="buffalo-popover-content">
        <div className="buffalo-popover-inner">
          <div className="buffalo-popover-inner-title">{title}</div>
          <div className="buffalo-popover-inner-content">{content}</div>
        </div>
      </div>
    </div>
  );
  const child =
    isValidElement(children) && !isFragment(children) ? (
      children
    ) : (
      <span>{children}</span>
    );
  return (
    <>
      {cloneElement(child, {
        ref: refs.setReference,
        ...getReferenceProps(),
        className,
        style,
      })}
      {createPortal(floating, el)}
    </>
  );
}
