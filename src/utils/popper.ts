import { Placement, Instance as Popper, createPopper as setupPopper, StrictModifiers } from "@popperjs/core";
import { getElementDir } from "./dom";

type PlacementRtl = "leading-start" | "leading" | "leading-end" | "trailing-end" | "trailing" | "trailing-start";

export type PopperPlacement = Placement | PlacementRtl;

export const CSS = {
  animation: "calcite-popper-anim",
  animationActive: "calcite-popper-anim--active"
};

export function getPlacement(el: HTMLElement, placement: PopperPlacement): Placement {
  const values = ["left", "right"];

  if (getElementDir(el) === "rtl") {
    values.reverse();
  }

  return placement.replace(/leading/gi, values[0]).replace(/trailing/gi, values[1]) as Placement;
}

export function createPopper({
  referenceEl,
  el,
  placement,
  modifiers
}: {
  el: HTMLElement;
  modifiers: Partial<StrictModifiers>[];
  placement: PopperPlacement;
  referenceEl: HTMLElement;
}): Popper | null {
  if (!referenceEl) {
    return null;
  }

  return setupPopper(referenceEl, el, {
    placement: getPlacement(el, placement),
    modifiers
  });
}

export function updatePopper({
  el,
  modifiers,
  placement: PopperPlacement,
  popper
}: {
  el: HTMLElement;
  modifiers: Partial<StrictModifiers>[];
  popper: Popper;
  placement: PopperPlacement;
}): void {
  const placement = getPlacement(el, PopperPlacement);

  popper.setOptions({
    modifiers,
    placement
  });
}

export function hypotenuse(sideA: number, sideB: number): number {
  return Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2));
}

const visiblePointerSize = 4;

export const defaultOffsetDistance = Math.ceil(hypotenuse(visiblePointerSize, visiblePointerSize));
