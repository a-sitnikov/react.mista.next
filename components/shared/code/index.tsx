import { useMemo, useState } from "react";
import { childrenToText } from "@/lib/utils";
import { prepareText } from "./code_highlight";

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

  const preStyle: React.CSSProperties = {};

  if (hidden && linesCount > 7) {
    preStyle.overflow = "hidden";
    preStyle.height = "135px";
  } else {
    preStyle.overflow = "auto";
    preStyle.height = "auto";
  }

  return (
    <div className="mt-1">
      <pre
        className="c-code-1C"
        style={preStyle}
        dangerouslySetInnerHTML={{ __html: text }}
      ></pre>
      {linesCount > 7 && (
        <div className="text-left font-[courier_new,courier] text-blue-500 my-[5px] mx-auto border border-dashed border-[#ddd] pb-[10px] w-full overflow-x-auto [scrollbar-color:#adb3be_transparent] scrollbar-thin tab-4 ">
          <span className="expand-button-span" onClick={onShowClick}>
            {hidden ? `Показать: ${linesCount} строк` : "Скрыть"}
          </span>
        </div>
      )}
    </div>
  );
};
