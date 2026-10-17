import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useQuans } from '../hooks';
import { MainLayout } from '../layouts';
import { LocalPage } from '../pages';

/** The quanar's own pages and every route of every loaded quan, all inside the layout. */
export const AppRoutes: React.FC = () => {
  const { manifests, loading, errors } = useQuans();

  return (
    <Routes>
      <Route element={<MainLayout manifests={manifests} loading={loading} errors={errors} />}>
        <Route index element={<LocalPage />} />
        {manifests.flatMap((manifest) =>
          manifest.routes.map((route) => <Route key={route.path} path={route.path} element={<route.component />} />)
        )}
        <Route path="*" element={loading ? <p>Loading…</p> : <p>Not found.</p>} />
      </Route>
    </Routes>
  );
};
