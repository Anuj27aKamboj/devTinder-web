
const UserCardSkeleton = () => {
  return (
    <div className="flex justify-center my-10">
      <div className="w-96 flex flex-col gap-4 p-4 bg-base-300 rounded-box">
        <div className="skeleton h-64 w-full rounded-box"></div>
        <div className="skeleton h-4 w-40"></div>
        <div className="skeleton h-4 w-32"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    </div>
  );
};

export default UserCardSkeleton;