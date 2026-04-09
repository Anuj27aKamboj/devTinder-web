import React from "react";

const withUserCardVariant = (WrappedComponent, options = {}) => {
  const {
    showButtons = true,
    imageSize = "large", // "large" | "small"
  } = options;

  return (props) => {
    const modifiedProps = {
      ...props,
      showButtons,
      imageClass:
        imageSize === "small"
          ? "mask mask-squircle h-40 w-40 object-cover shadow-lg mt-4 justify-center"
          : "w-full shadow-lg",
    };

    return <WrappedComponent {...modifiedProps} />;
  };
};

export default withUserCardVariant;