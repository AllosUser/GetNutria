"use client";

interface AnchorTargetProps {
  id: string;
}

export function AnchorTarget({ id }: AnchorTargetProps) {
  return (
    <span
      id={id}
      aria-hidden="true"
      className="relative block h-0 -top-[88px] pointer-events-none select-none opacity-0 overflow-hidden"
    />
  );
}
