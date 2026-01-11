import { ChangeEventHandler, useMemo } from "react";

import { useSections } from "@/store/query-hooks";
import { groupBy } from "@/lib/utils";
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "../ui/native-select";
import { useRouter, useSearchParams } from "next/navigation";

export const SelectSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data: items = [] } = useSections();

  const tree = useMemo(() => groupBy(items, (item) => item.forum), [items]);

  const handleSectionChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const newSection = e.target.value;

    const params = new URLSearchParams(searchParams.toString());
    if (newSection === "") {
      params.delete("section");
    } else {
      params.set("section", newSection);
    }
    router.replace(`?${params.toString()}`);
  };

  return (
    <NativeSelect
      defaultValue={searchParams.get("section") ?? ""}
      onChange={handleSectionChange}
    >
      <NativeSelectOption value="">Все секции</NativeSelectOption>
      {Object.entries(tree).map(([forum, group]) => (
        <NativeSelectOptGroup key={forum} label={forum}>
          {group.map((item) => (
            <NativeSelectOption key={item.id} value={item.code}>
              {item.name}
            </NativeSelectOption>
          ))}
        </NativeSelectOptGroup>
      ))}
    </NativeSelect>
  );
};
