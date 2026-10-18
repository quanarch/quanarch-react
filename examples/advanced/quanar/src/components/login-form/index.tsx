import React, { useState } from 'react';
import { STRINGS } from '../../langs';

interface LoginFormProps {
  busy: boolean;
  error: string | null;
  initial?: { username: string; password: string };
  onSubmit: (username: string, password: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ busy, error, initial, onSubmit }) => {
  const [username, setUsername] = useState(initial?.username ?? '');
  const [password, setPassword] = useState(initial?.password ?? '');

  React.useEffect(() => {
    if (initial) {
      setUsername(initial.username);
      setPassword(initial.password);
    }
  }, [initial]);

  return (
    <form
      className="login__form"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(username, password);
      }}
    >
      <label>
        {STRINGS.username}
        <input value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" />
      </label>
      <label>
        {STRINGS.password}
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
      </label>
      {error && <p className="qa-error">{error}</p>}
      <button className="qa-btn qa-btn--primary" type="submit" disabled={busy}>
        {busy ? STRINGS.loading : STRINGS.signIn}
      </button>
    </form>
  );
};
