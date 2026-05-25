import { Interweave, InterweaveProps } from "interweave";
import { usePrepareHtml } from "../hooks/use-prepare-html";
import { Code } from "@/components/shared/code";
import { LinkToPost } from "@/components/shared/link-to-post";
import { CustomLink } from "@/components/shared/custom-link";
import { twMerge } from "tailwind-merge";
import { IMessage } from "@/mista-api/types";

interface IProps {
  item: IMessage;
  topicId: string;
  classname?: string;
}

export const MsgText: React.FC<IProps> = ({ item, topicId, classname }) => {
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

      // case "int_img": {
      //   const idx = node.getAttribute("idx");
      //   return (
      //     <InternalImage
      //       topicId={topicId}
      //       topicDate={topicDate}
      //       messageNumber={messageNumber}
      //       idx={idx}
      //     />
      //   );
      //}

      default:
        return undefined;
    }
  };

  return (
    <Interweave
      tagName="div"
      content={content}
      transform={transform}
      className={twMerge("p-3 [word-break:break-word]", classname)}
    />
  );
};
