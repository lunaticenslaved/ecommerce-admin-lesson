import { UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <div>
      <p>Protected route</p>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
