type PlayersType = {
  id: number;
  name: string;
  team_id: number;
  UID?: string | null;
  created_at: string;
};

const HEADERS = ["Players", "Played", "GK", "Goals", "Assists", "Win"];

export default function TeamOverview({
  team,
}: // players,
// seasons,
{
  team: { name: string };
  players: PlayersType[];
  seasons: { name: string }[];
}) {
  return (
    <div className="w-full">
      <h1 className="">{team.name}</h1>
      <div>
        {/* {seasons.map((season) => {
          const { name, } = season;
          return (
            <button key={id} className="bg-slate-400">
              {name}
            </button>
          );
        })} */}
      </div>
      <table className="w-full text-left">
        <thead>
          <tr>
            {HEADERS.map((item) => (
              <th key={item}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Lloyd</td>
            <td>5</td>
            <td>0</td>
            <td>5</td>
            <td>3</td>
            <td>5</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
