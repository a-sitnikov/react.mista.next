import { CustomLink } from "@/components/shared/custom-link";
import { LinkToPost } from "@/components/shared/link-to-post";
import { PreviewImage } from "@/components/shared/preview-image";
import { Code } from "lucide-react";
import parse, { DOMNode, domToReact, Element } from "html-react-parser";
import { prepareHtml } from "../utils";
import { twMerge } from "tailwind-merge";

interface IProps {
  text: string;
  topicId: string;
  className?: string;
}

export const MsgText: React.FC<IProps> = ({ text, topicId, className }) => {
  const content = prepareHtml(text, topicId);

  const options = {
    replace: (node: unknown) => {
      if (!(node instanceof Element)) return;

      const tag = node.name.toLowerCase();

      switch (tag) {
        case "a": {
          const href = node.attribs?.href ?? "";
          return (
            <CustomLink href={href} parentText={text}>
              {domToReact(node.children as unknown as DOMNode[], options)}
            </CustomLink>
          );
        }

        case "link": {
          const n = parseInt(node.attribs?.["data-number"] ?? "0");
          return <LinkToPost topicId={topicId} n={n} />;
        }

        case "code":
        case "pre":
          return (
            <Code>
              {domToReact(node.children as unknown as DOMNode[], options)}
            </Code>
          );

        case "img": {
          const src = node.attribs?.src ?? "";
          return (
            <PreviewImage src={src}>
              {domToReact(node.children as unknown as DOMNode[], options)}
            </PreviewImage>
          );
        }

        default:
          return undefined;
      }
    },
  };

  return (
    <div
      className={twMerge(
        "[word-break:break-word] [&_pre]:scrollbar-thin max-md:[&_pre]:whitespace-pre-wrap",
        className,
      )}
    >
      {parse(content, options)}
    </div>
  );
};
