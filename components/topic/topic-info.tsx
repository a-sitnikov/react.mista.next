import { DOMAIN } from "@/app/api/constants";
import { ITopicInfo } from "@/app/api/topic/topic.schema";

interface IProps {
  info: ITopicInfo;
}

export const TopicInfo: React.FC<IProps> = ({ info }) => {
  return (
    <div className="grid grid-cols-[165px_1fr] [grid-template-areas:'user_message'] border-t bg-background">
      <div className="[grid-area:user] border-r" />
      <div className="flex justify-center p-3">
        <a
          href={`${DOMAIN}/topic/${info.id}`}
          className="text-linkColor text-2xl font-semibold"
          target="_blank"
        >
          <h1 dangerouslySetInnerHTML={{ __html: info.title }} />
        </a>
      </div>
    </div>
  );
};
