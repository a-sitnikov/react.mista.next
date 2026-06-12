import { useMemo, useState } from "react";
import { childrenToText } from "@/lib/utils";
import { prepareText } from "./code_highlight";
import { twMerge } from "tailwind-merge";

export const Code: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [hidden, setHidden] = useState(true);

  const [text, linesCount] = useMemo(() => {
    if (!children) return ["", 0];

    let _text = childrenToText(children).join("");
    _text = prepareText(_text);

    return [_text, _text.split("\n").length];
  }, [children]);

  const onShowClick = () => {
    setHidden((prev) => !prev);
  };

  return (
    <div
      className={twMerge(
        "relative border border-dashed border-borderInner",
        linesCount > 7 && "pb-6 mb-3",
      )}
    >
      <pre
        className={twMerge(
          "c-code-1C overflow-hidden",
          hidden && linesCount > 7 && "max-h-40",
        )}
        dangerouslySetInnerHTML={{ __html: text }}
      ></pre>
      {linesCount > 7 && (
        <div className="absolute -bottom-3 py-0.5 text-center mx-auto w-full overflow-x-auto [scrollbar-color:#adb3be_transparent] scrollbar-thin tab-4 ">
          <span
            className="px-3 py-0.5 border rounded-sm border-dashed border-[#ddd] cursor-pointer bg-background"
            onClick={onShowClick}
          >
            {hidden ? `Показать: ${linesCount} строк` : "Скрыть"}
          </span>
        </div>
      )}
    </div>
  );
};
