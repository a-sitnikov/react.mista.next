import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Pencil,
  X,
} from "lucide-react";
import Link from "next/link";

type IProps = {
  topicId: string;
  onFirst: () => void;
  onLast: () => void;
  onPrev: () => void;
  onNext: () => void;
  close: () => void;
};

export const PreviewButtons: React.FC<IProps> = ({
  topicId,
  onFirst,
  onPrev,
  onNext,
  onLast,
  close,
}) => {
  return (
    <div className="flex gap-0.5">
      <button
        className="flex items-center justify-center grow
                  px-1 py-0.5 border border-borderOuter rounded-sm cursor-pointer"
        onClick={onFirst}
        title="К первому"
      >
        <ChevronsLeft strokeWidth={1} className="h-5" />
      </button>
      <button
        className="flex items-center justify-center grow-2
                  px-1 py-0.5 border border-borderOuter rounded-sm cursor-pointer"
        onClick={onPrev}
        title="К предыдущему"
      >
        <ChevronLeft strokeWidth={1} className="h-5" />
      </button>
      <button
        className="flex items-center justify-center grow-2
                  px-1 py-0.5 border border-borderOuter rounded-sm cursor-pointer"
        onClick={onNext}
        title="К следующему"
      >
        <ChevronRight strokeWidth={1} className="h-5" />
      </button>
      <button
        className="flex items-center justify-center grow
                  px-1 py-0.5 border border-borderOuter rounded-sm cursor-pointer"
        onClick={onLast}
        title="К последнему"
      >
        <ChevronsRight strokeWidth={1} className="h-5" />
      </button>
      <button
        className="px-1 py-0.5 border border-borderOuter rounded-sm cursor-pointer"
        onClick={close}
      >
        <X strokeWidth={1} className="h-5" />
      </button>
      <Link
        href={`/topic/${topicId}#F`}
        prefetch={false}
        className="flex items-center text-inherit 
                  px-1 py-0.5 border border-borderOuter rounded-sm cursor-pointer"
      >
        <Pencil strokeWidth={1} className="h-4" />
      </Link>
    </div>
  );
};
