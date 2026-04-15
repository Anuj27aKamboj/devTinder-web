const withUserCardVariant = (WrappedComponent, options = {}) => {
  const { imageSize = "large" } = options;

  return (props) => {
    const imageClass =
      imageSize === "small"
        ? "mask mask-squircle h-40 w-40 object-cover shadow-lg mt-4"
        : "w-full shadow-lg";

    return <WrappedComponent {...props} imageClass={imageClass} />;
  };
};

export default withUserCardVariant;