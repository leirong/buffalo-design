import React from "react";
import { PropsWithChildren, ReactNode, CSSProperties } from "react";
type Alignment = "start" | "end";
type Side = "top" | "right" | "bottom" | "left";
type AlignedPlacement = `${Side}-${Alignment}`;
export interface PopoverProps extends PropsWithChildren {
    className?: string;
    style?: CSSProperties;
    children: ReactNode;
    title?: ReactNode;
    content?: ReactNode;
    trigger?: "click" | "hover";
    placement?: Side | AlignedPlacement;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}
export default function Popover({ className, style, children, title, content, trigger, placement, open, onOpenChange, }: PopoverProps): React.JSX.Element;
export {};
