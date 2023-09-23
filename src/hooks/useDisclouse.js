import { useState } from 'react';
import { db } from '../config/firebase';
// creating a custom hook named useDisclouse

const useDisclouse = () => {

  const [isOpen, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  }
  const onClose = () => {
    setOpen(false);
  }

  return { onClose, onOpen, isOpen };

}
//instead of returning jsx, we are returning a fuction/value


export default useDisclouse;