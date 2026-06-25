import { PreviewImage } from "@/components/shared/preview-image";

interface IProps {
  imgs: string[];
}

export const MsgImgs: React.FC<IProps> = ({ imgs }) => {
  return (
    <div className="flex flex-wrap gap-2 items-start">
      {imgs.map((img, idx) => (
        <PreviewImage
          src={img}
          fullSrc={img.replace("_thumb", "")}
          key={idx}
          className="max-w-full max-h-50 cursor-pointer"
        />
      ))}
    </div>
  );
};
