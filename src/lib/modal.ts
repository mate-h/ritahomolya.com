/** Dispatch close event on click outside of node */
export function closeOnClickOutside(node: HTMLElement) {
  const handleClick = (event: MouseEvent) => {
    if (node && event.target && !event.defaultPrevented) {

      node.dispatchEvent(
        new CustomEvent("close")
      );
    }
  };

  document.addEventListener("click", handleClick, true);

  return {
    destroy() {
      document.removeEventListener("click", handleClick, true);
    }
  };
}

/** Dispatch close event on click outside of node */
export function closeOnFocusOutside(node: HTMLElement) {
  const handleFocusIn = (event: FocusEvent) => {
    if (node && event.target && !node.contains(event.target as HTMLElement) && !event.defaultPrevented) {
      node.dispatchEvent(
        new CustomEvent("close")
      );
    }
  };

  document.addEventListener("focusin", handleFocusIn, true);

  return {
    destroy() {
      document.removeEventListener("focusin", handleFocusIn);
    }
  };
}