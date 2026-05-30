import { useState } from "react";
import { useSections } from "@/store/query-hooks";
import { groupBy } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useParams, useRouter } from "next/navigation";

export const SelectSection = () => {
  const router = useRouter();
  const { section = "all" } = useParams<{ section?: string }>();
  const [open, setOpen] = useState(false);

  const { data: items = [], isError } = useSections();
  if (isError) {
    return null;
  }

  const tree = groupBy(items, (item) => item.arena);

  const handleSectionChange = (newSection: string) => {
    setOpen(true);

    if (newSection === "all") {
      router.push("/");
    } else {
      router.push(`/section/${newSection}`);
    }
  };

  return (
    <Select
      value={section}
      open={open}
      onOpenChange={setOpen}
      onValueChange={handleSectionChange}
    >
      <SelectTrigger className="w-60 bg-background border border-borderOuter">
        <SelectValue placeholder="Все секции" />
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectItem value="all">Все секции</SelectItem>
        {Object.entries(tree).map(([arena, group]) => (
          <SelectGroup key={arena}>
            <SelectLabel>{arena.toUpperCase()}</SelectLabel>
            {group.map((item) => (
              <SelectItem key={item.code} value={item.code}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
};
