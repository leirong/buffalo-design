/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
export function isFragment(child: any): boolean {
  return child && React.isValidElement(child) && child.type === React.Fragment;
}
