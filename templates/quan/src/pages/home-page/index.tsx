import { UserCard } from '../../components';
import { QUAN_NAME, QUAN_TITLE } from '../../constants';
import { useUser } from '../../hooks';

export function HomePage() {
  const { user, notify } = useUser();

  return (
    <UserCard title={QUAN_TITLE}>
      <p>{user ? `Signed in as ${user.name}.` : 'No user yet.'}</p>
      <button onClick={() => notify(`Hello from ${QUAN_NAME}`)}>Say hello</button>
    </UserCard>
  );
}
