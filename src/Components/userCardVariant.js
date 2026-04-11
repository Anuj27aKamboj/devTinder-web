import UserCard from "./UserCard";
import withUserCardVariant from "./withUserCardVariant";

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