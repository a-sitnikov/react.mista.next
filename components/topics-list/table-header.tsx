import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface IProps {
  isLoading: boolean;
  update: () => void;
}

export const TableHeader: React.FC<IProps> = ({ isLoading, update }) => {
  return (
    <div
      className="
      grid
      font-bold
      text-center
      sticky
      z-1
      top-14
      border-b border-borderOuter
      bg-tableHeaderBg
      grid-cols-[50px_30px_auto_30px_120px_155px]
      max-md:hidden
      "
    >
      <div style={{ letterSpacing: "-1px" }}>Раздел</div>
      <div></div>
      <div>Тема</div>
      <div>Re</div>
      <div>Автор</div>
      <div>
        <Tooltip>
          <TooltipTrigger asChild>
            {isLoading ? (
              <span>Обновляется</span>
            ) : (
              <span className="cursor-pointer" onClick={update}>
                Обновлено
              </span>
            )}
          </TooltipTrigger>
          <TooltipContent>
            <p>Обновить список</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};
