import Metric from "../shared/Metric";
import RenderTag from "../shared/RenderTag";

interface Props {
  _id: string;
  tags: { _id: string; name: string }[];
  author: {
    _id: string;
    name: string;
    picture: string;
  };
}

const UserCard = ({ _id, tags, author }: Props) => {
  return (
    <div className="card-wrapper flex flex-col items-center justify-center rounded-xl border p-9 sm:px-11">
      <Metric
        imgUrl={author.picture}
        alt="user"
        value={author.name}
        title={`@${author.name}`}
        href={`/profile/${_id}`}
        isAuthor
        textStyles="body-medium text-dark400_light700 flex-col"
      />

      <div className="mb-6 mt-3 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>
    </div>
  );
};

export default UserCard;
