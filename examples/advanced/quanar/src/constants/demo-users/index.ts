export interface DemoUser {
  username: string;
  password: string;
  description: string;
}

/** The users in the server's database, shown on the sign-in page. */
export const DEMO_USERS: DemoUser[] = [
  { username: 'ada', password: 'ada123', description: 'Every permission: sees all four quans.' },
  { username: 'alan', password: 'alan123', description: 'Limited: sees inventory and reports only.' },
];
