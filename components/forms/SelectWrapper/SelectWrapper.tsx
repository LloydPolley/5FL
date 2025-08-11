"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type Season = {
  id: string | number;
  name: string;
};

type Props = {
  data: Season[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function SelectWrapper({
  data,
  value,
  onChange,
  placeholder = "Select a season",
}: Props) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {data.map((season) => (
          <SelectItem key={season.id} value={season.id.toString()}>
            {season.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
