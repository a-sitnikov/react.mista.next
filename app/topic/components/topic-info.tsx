import { DOMAIN } from "@/app/api/constants";
import { ITopicInfo } from "@/app/api/topic/topic.schema";

interface IProps {
  info: ITopicInfo;
}

export const TopicInfo: React.FC<IProps> = ({ info }) => {
  return (
    <div>
      <div />
      <a href={`${DOMAIN}/topic/${info.id}`}>
        <h1 dangerouslySetInnerHTML={{ __html: info.title }} />
      </a>
    </div>
  );
};
