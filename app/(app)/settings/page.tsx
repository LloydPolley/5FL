import { getUser } from "@/utils/users/getUser";

import CreateTeamForm from "./components/CreateTeamForm";
import ManageSeasons from "./components/ManageSeasons";

export default async function Settings() {
  const user = await getUser();

  return (
    <div>
      <CreateTeamForm />
      <ManageSeasons user={user} />
    </div>
  );
}
