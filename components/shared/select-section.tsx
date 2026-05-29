import { ChangeEventHandler } from "react";

import { useSections } from "@/store/query-hooks";
import { groupBy } from "@/lib/utils";
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "../ui/native-select";
import { useParams, useRouter } from "next/navigation";

export const SelectSection = () => {
  const router = useRouter();
  const { section } = useParams<{ section?: string }>();

  const { data: items = [], isError } = useSections();
  if (isError) {
    return null;
  }

  const tree = groupBy(items, (item) => item.arena);

  const handleSectionChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const newSection = e.target.value;
    if (!newSection) {
      router.push("/");
    } else {
      router.push(`/section/${newSection}`);
    }
  };

  return (
    <NativeSelect
      value={section}
      onChange={handleSectionChange}
      className="bg-background border-borderOuter w-60"
    >
      <NativeSelectOption value="">Все секции</NativeSelectOption>
      {Object.entries(tree).map(([arena, group]) => (
        <NativeSelectOptGroup key={arena} label={arena.toUpperCase()}>
          {group.map((item) => (
            <NativeSelectOption key={item.code} value={item.code}>
              {item.name}
            </NativeSelectOption>
          ))}
        </NativeSelectOptGroup>
      ))}
    </NativeSelect>
  );
};
