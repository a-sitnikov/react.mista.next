import { UserInfo } from "./user-info";
import { MsgText } from "./msg-text";
import { IMessage } from "@/mista-api/types";

interface IProps {
  item: IMessage;
  topicId: string;
  isAuthor: boolean;
}

export const TopicRow: React.FC<IProps> = ({ item, topicId, isAuthor }) => {
  return (
    <div
      className="grid grid-cols-[165px_1fr] 
                [grid-template-areas:'user_message'] 
                max-md:grid-cols-[1fr]
                max-md:[grid-template-areas:'user''message']
                max-md:mb-1.5
                max-md:border max-md:border-borderOuter
                border-t bg-background"
    >
      <UserInfo item={item} isAuthor={isAuthor} />
      <MsgText item={item} topicId={topicId} />
    </div>
  );
};
