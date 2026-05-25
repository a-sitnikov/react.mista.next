import { DOMAIN } from "@/app/api/constants";
import { ITopicInfo } from "@/mista-api/types";

interface IProps {
  info: ITopicInfo;
}

export const TopicInfo: React.FC<IProps> = ({ info }) => {
  return (
    <div
      className="grid grid-cols-[165px_1fr] 
                [grid-template-areas:'user_message']
                max-md:grid-cols-[1fr] 
                max-md:[grid-template-areas:'message'] 
                border-t bg-background
                max-md:border max-md:border-borderOuter 
                max-md:mb-1.5"
    >
      <div className="[grid-area:user] border-r" />
      <div className="flex justify-center p-3">
        <a
          href={`${DOMAIN}/topic/${info.id}`}
          className="text-linkColor text-2xl font-semibold"
          target="_blank"
        >
          <h1>{info.title}</h1>
        </a>
      </div>
    </div>
  );
};
