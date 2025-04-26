import Star from "./icons/star";
import { Button } from "./ui/button";

type Props = {
  title: string;
  rating: number;
  onDeleteMovie: () => void;
};

export default function Movie(props: Props) {
  const getStars = () => {
    const stars = [];
    for (let i = 0; i < props.rating; i++) {
      stars.push(<Star key={i} />);
    }

    return stars;
  };

  return (
    <div className="w-full flex items-center justify-between py-2">
      <div>{props.title}</div>
      <div className="flex items-center">
        {getStars()}
        <Button
          className="ml-2 p-3"
          variant="outline"
          onMouseDown={() => props.onDeleteMovie()}
        >
          X
        </Button>
      </div>
    </div>
  );
}
