import UserCard from "../components/UserCard.jsx";
import withUserCardVariant from "../components/withUserCardVariant.jsx";

export const FeedUserCard = withUserCardVariant(UserCard, {
  imageSize: "large",
});

export const ProfileUserCard = withUserCardVariant(UserCard, {
  imageSize: "small",
});

export const RequestUserCard = withUserCardVariant(UserCard, {
  imageSize: "large",
});

export const ConnectionUserCard = withUserCardVariant(UserCard, {
  imageSize: "small",
});