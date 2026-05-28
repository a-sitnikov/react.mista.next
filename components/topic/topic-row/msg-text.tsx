import { Interweave, InterweaveProps } from "interweave";
import { usePrepareHtml } from "../hooks/use-prepare-html";
import { Code } from "@/components/shared/code";
import { LinkToPost } from "@/components/shared/link-to-post";
import { CustomLink } from "@/components/shared/custom-link";
import { twMerge } from "tailwind-merge";
import { IMessage } from "@/mista-api/types";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import PollChart from "./poll-chart";
import { pollVariants } from "../constants";

interface IProps {
  item: IMessage;
  topicId: string;
  className?: string;
}

export const MsgText: React.FC<IProps> = ({ item, topicId, className }) => {
  const { prepareHtml } = usePrepareHtml();

  const content = prepareHtml(item.text, topicId);

  const transform: InterweaveProps["transform"] = (node, children) => {
    const tagName = node.tagName.toLowerCase();
    switch (tagName) {
      case "a": {
        const href = node.getAttribute("href") ?? "";
        return (
          <CustomLink href={href} parentText={item.text}>
            {children}
          </CustomLink>
        );
      }

      case "link": {
        const n = parseInt(node.getAttribute("data-number") ?? "0");
        return <LinkToPost topicId={topicId} n={n} />;
      }

      case "code":
      case "pre":
        return <Code>{children}</Code>;

      default:
        return undefined;
    }
  };

  return (
    <div
      className={twMerge("flex flex-col gap-2 p-3 overflow-hidden", className)}
    >
      {item.poll && <PollChart items={item.poll} />}
      {item.text && (
        <Interweave
          tagName="div"
          content={content}
          transform={transform}
          className={
            "[word-break:break-word] [&_pre]:scrollbar-thin max-md:[&_pre]:whitespace-pre-wrap"
          }
        />
      )}
      {item.voting && (
        <div
          className="font-semibold"
          style={{
            color: pollVariants[parseInt(item.voting.variant) - 1].color,
          }}
        >
          {`${item.voting.variant}. ${item.voting.text}`}
        </div>
      )}
      {item.imgs && (
        <div className="flex flex-wrap gap-2 items-start">
          <PhotoProvider>
            {item.imgs?.map((img, idx) => (
              <PhotoView src={img.replace("_thumb", "")} key={idx}>
                <img
                  src={img}
                  alt=""
                  className="max-w-full max-h-50 cursor-pointer"
                />
              </PhotoView>
            ))}
          </PhotoProvider>
        </div>
      )}
    </div>
  );
};
