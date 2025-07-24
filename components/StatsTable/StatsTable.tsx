type Header = {
  key: string;
  label: string;
  align: string;
};

type Player = {
  user_id?: string;
  id?: string;
  name: string;
  goals: number;
  assists: number;
  gk: number;
  points: number;
  users?: any;
};

type StatsTableCardProps = {
  headers: Header[];
  players: Player[];
  date?: string;
  team_score?: number;
  opponent_score?: number;
  opponent?: string;
};
export default function StatsTableCard({
  headers,
  players,
  date,
  team_score,
  opponent_score,
  opponent,
}: StatsTableCardProps) {
  const columnWidthClass = `w-[${100 / headers.length}%]`;

  console.log("players", players);

  return (
    <div className="bg-white overflow-hidden rounded-xl border border-zinc-200">
      {team_score && (
        <div className="bg-zinc-900 text-white px-4 py-4">
          <p className="text-xs text-center text-zinc-400 mb-1 tracking-wide">
            {new Date(date || "").toDateString()}
          </p>
          <div className="flex justify-between text-center font-medium text-sm">
            <p className="w-1/3 text-zinc-100">Ballers</p>
            <p className="w-1/3 text-white">
              {team_score} - {opponent_score}
            </p>
            <p className="w-1/3 text-zinc-100">{opponent}</p>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="table-fixed w-full text-sm text-zinc-800">
          <thead className="bg-zinc-100 text-xs uppercase text-zinc-500 border-b border-zinc-200">
            <tr>
              {headers.map(({ key, label, align = "left" }) => (
                <th
                  key={key}
                  className={`${columnWidthClass} py-3 px-2 text-center font-semibold`}
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {players.map((player, idx) => (
              <tr
                key={player.id || idx}
                className="hover:bg-zinc-50 border-b border-zinc-100 transition-colors"
              >
                {headers.map(({ key }) => {
                  const content =
                    player[key] !== undefined
                      ? player[key]
                      : player?.users?.[key] || "-";

                  const isPlayerName = key === "player";
                  const alignment = isPlayerName ? "text-left" : "text-center";
                  const font = isPlayerName ? "font-medium text-zinc-900" : "";

                  return (
                    <td
                      key={key}
                      className={`${columnWidthClass} py-3 px-2 ${alignment} ${font}`}
                    >
                      {content}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
