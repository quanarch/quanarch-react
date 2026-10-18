import { useNavigationBridge } from '../../hooks';

/** Renders nothing; connects the router to the navigation service. */
export function NavigationBridge(): null {
  useNavigationBridge();
  return null;
}
