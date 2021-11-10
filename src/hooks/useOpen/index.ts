import React, { useState } from "react";

const useOpen = (bool: boolean = false) => {
  const [visible, setVisible] = useState(bool);

  const onOpen = () => setVisible(true);
  const onClose = () => setVisible(false);

  return {
    isOpened: visible,
    onOpen,
    onClose
  };
};

export default useOpen;
