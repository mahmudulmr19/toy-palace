import React from "react";

const useScrollTop = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
};

export default useScrollTop;
