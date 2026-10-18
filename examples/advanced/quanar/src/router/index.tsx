import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../constants';
import { useQuans } from '../hooks';
import { DashboardLayout } from '../layouts';
import { HomePage, LoginPage, NotFoundPage, QuanPage } from '../pages';

/** The quanar's pages and every route of every loaded quan. */
export const AppRoutes: React.FC = () => {
  const { entries } = useQuans();

  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route element={<DashboardLayout />}>
        <Route index element={<HomePage />} />
        {entries.flatMap((entry) =>
          (entry.manifest?.routes ?? []).map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<QuanPage name={entry.source.name} component={route.component} permission={route.permission} />}
            />
          ))
        )}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
