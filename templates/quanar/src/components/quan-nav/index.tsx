import type { LoadedQuan } from '../../types';
import './index.css';

export interface QuanNavProps {
  quans: LoadedQuan[];
  active?: string;
  onSelect: (name: string) => void;
}

export function QuanNav({ quans, active, onSelect }: QuanNavProps) {
  return (
    <nav className="quan-nav">
      {quans.map((q) => (
        <button key={q.name} className={q.name === active ? 'is-active' : ''} onClick={() => onSelect(q.name)}>
          {q.name}
        </button>
      ))}
    </nav>
  );
}
