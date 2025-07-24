import ManageSeasons from "./components/ManageSeasons";

export default async function TeamSettings({
  params,
}: {
  params: { team: string };
}) {
  return <ManageSeasons teamId={params.team} />;
}
