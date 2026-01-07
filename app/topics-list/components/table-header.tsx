import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const TableHeader = () => {
  return (
    <div
      className="
      grid
      font-bold
      text-center
      sticky
      z-1
      top-14
      border
      bg-(--tableHeaderBg)
      grid-cols-[50px_30px_auto_30px_120px_155px]
      "
      //className="table-header" /* style={{ position: "sticky", top: "39px" }} */
    >
      <div style={{ letterSpacing: "-1px" }}>Раздел</div>
      <div></div>
      <div>Тема</div>
      <div>Re</div>
      <div>Автор</div>
      <div>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="cursor-pointer">{"Обновлено"}</span>
          </TooltipTrigger>
          <TooltipContent>
            <p>Обновить список</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};
