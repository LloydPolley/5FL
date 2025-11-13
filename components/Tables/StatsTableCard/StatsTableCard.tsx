import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Header = {
  key: string;
  label: string;
  points?: number;
};

type Player = {
  user_id?: string;
  id?: string;
  name: string;
  goals: number;
  assists: number;
  gk: number;
  points?: number;
  users?: Record<string, any>;
  [key: string]: any;
};

type StatsTableCardProps = {
  headers: Header[];
  players: Player[];
};

export default function StatsTableCard({
  headers,
  players,
}: StatsTableCardProps) {
  const sortedPlayers = [...players].sort(
    (a, b) => (b.points || 0) - (a.points || 0)
  );

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableCaption className="text-sm text-muted-foreground py-3">
            Player Performance Statistics
          </TableCaption>
          <TableHeader>
            <TableRow className="border-b">
              {headers.map(({ key, label }) => (
                <TableHead key={key} className="text-bold">
                  <div className="text-center">
                    <p>{label}</p>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedPlayers.map((player, idx) => {
              return (
                <TableRow
                  key={player.id || player.user_id || idx}
                  className={`group duration-200`}
                >
                  {headers.map(({ key }) => {
                    let content: any = player[key as keyof Player];

                    return (
                      <TableCell key={key} className={`py-3`}>
                        <div className="flex items-center gap-2 justify-center">
                          {key === "name" && (
                            <div className="flex items-center gap-2 justify-start w-full">
                              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold">
                                {idx + 1}
                              </div>
                              <span>{content}</span>
                            </div>
                          )}

                          {key === "goals" && (
                            <div className="flex items-center gap-1 justify-center">
                              <span className="font-semibold">{content}</span>
                            </div>
                          )}

                          {key === "assists" && (
                            <div className="flex items-center gap-1 justify-center">
                              <span className="font-semibold">{content}</span>
                            </div>
                          )}

                          {key === "points" && (
                            <span className="font-bold">{content}</span>
                          )}

                          {key !== "name" &&
                            key !== "goals" &&
                            key !== "assists" &&
                            key !== "points" && <span>{content}</span>}
                        </div>
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {players.length > 0 && (
        <div className="px-4 py-3 border-t text-sm">
          <div className="flex justify-between items-center">
            <span>{players.length} players total</span>
          </div>
        </div>
      )}
    </>
  );
}
