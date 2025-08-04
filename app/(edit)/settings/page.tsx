import { signout } from "@/actions/auth/signout";

export default async function Settings() {
  return (
    <div>
      <h1>Settings</h1>
      <form action={signout}>
        <button type="submit">Sign out</button>
      </form>
    </div>
  );
}
