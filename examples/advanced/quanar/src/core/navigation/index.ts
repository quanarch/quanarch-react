type Navigator = (path: string) => void;

let navigator: Navigator | null = null;

/** Lets code outside React move the router; the router hands its navigate function over once. */
export const navigation = {
  setNavigator(next: Navigator): void {
    navigator = next;
  },

  navigate(path: string): void {
    if (navigator) navigator(path);
    else window.location.assign(path);
  },
};
