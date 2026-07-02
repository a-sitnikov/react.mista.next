import { MsgTime } from "./msg-time";
import { UserLink } from "./user-link";
import { IMessage } from "@/mista-api/types";

interface IProps {
  item: IMessage;
  isAuthor: boolean;
  online: boolean;
}

export const UserInfo: React.FC<IProps> = ({ item, isAuthor, online }) => {
  return (
    <div
      className="[grid-area:user] border-r py-3 px-2
                flex flex-col items-end
                max-md:flex max-md:flex-row max-md:items-center max-md:justify-between max-md:gap-2
                max-md:py-0 max-md:px-1
                max-md:text-[13px]
                max-md:bg-tableHeaderBg
                max-md:border-b max-md:border-borderOuter
                max-md:sticky max-md:top-14"
    >
      <UserLink
        id={item.user.id}
        name={item.user.name}
        isAuthor={isAuthor}
        online={online}
      />
      <MsgTime item={item} />
    </div>
  );
};
