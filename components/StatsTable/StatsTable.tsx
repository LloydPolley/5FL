import { Card } from "../ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type Header = {
  key: string;
  label: string;
  align?: string;
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
  return (
    <Card>
      {team_score && (
        <div className="p-4 border-b">
          <p className="text-xs text-center mb-1 tracking-wide">
            {new Date(date || "").toDateString()}
          </p>
          <div className="flex justify-between text-center font-medium text-sm">
            <p className="w-1/3">Ballers</p>
            <p className="w-1/3">
              {team_score} - {opponent_score}
            </p>
            <p className="w-1/3">{opponent}</p>
          </div>
        </div>
      )}

      <Table className="text-center">
        <TableCaption>Player stats</TableCaption>
        <TableHeader>
          <TableRow className="text-center">
            {headers.map(({ key, label }) => (
              <TableHead className="text-center font-bold" key={key}>
                {label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.map((player, idx) => (
            <TableRow key={player.id || idx}>
              {headers.map(({ key }) => {
                const content =
                  player[key] !== undefined
                    ? player[key]
                    : player?.users?.[key] || "-";

                const isPlayerName = key === "player";
                const alignment = isPlayerName ? "text-left" : "text-center";

                return (
                  <TableCell className={`${alignment}`} key={key}>
                    {content}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
