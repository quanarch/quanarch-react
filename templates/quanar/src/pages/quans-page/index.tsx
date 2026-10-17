import { useState } from 'react';
import { EmptyState, ErrorMessage, QuanNav, QuanView } from '../../components';
import { useQuans } from '../../hooks';
import { MainLayout } from '../../layouts';

/** Shows the quans this user receives, one at a time. */
export function QuansPage() {
  const { quans, error, loading } = useQuans();
  const [selected, setSelected] = useState<string>();
  const active = quans?.find((q) => q.name === selected) ?? quans?.[0];

  return (
    <MainLayout nav={quans && <QuanNav quans={quans} active={active?.name} onSelect={setSelected} />}>
      {error && <ErrorMessage message={error} />}
      {loading && <p>Loading quans…</p>}
      {quans?.length === 0 && <EmptyState />}
      {active && <QuanView quan={active} />}
    </MainLayout>
  );
}
