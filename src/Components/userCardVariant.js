import UserCard from "./UserCard";
import withUserCardVariant from "./withUserCardVariant";

export const FeedUserCard = withUserCardVariant(UserCard, {
  showButtons: true,
  imageSize: "large",
});

export const ProfileUserCard = withUserCardVariant(UserCard, {
  showButtons: false,
  imageSize: "small",
});