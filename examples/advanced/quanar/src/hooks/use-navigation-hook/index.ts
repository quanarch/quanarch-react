import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { navigationService } from '../../services';

/** Hands the router's navigate function to the navigation service, for quans and services. */
export function useNavigationBridge(): void {
  const navigate = useNavigate();
  useEffect(() => {
    navigationService.setNavigator(navigate);
  }, [navigate]);
}
