import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./components/ContactCard";
import Modal from "./components/Modal";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import useDisclouse from "./hooks/useDisclouse";
import { ToastContainer, toast } from "react-toastify";
import NotFoundContact from "./components/NotFoundContact";

const App = () => {
  const [contacts, setContacts] = useState([]);

  // const [isOpen, setOpen] = useState(false);

  // const onOpen = () =>{
  //   setOpen(true);
  // }
  // const onClose = () =>{
  //   setOpen(false);
  // }
  //instead of writing above lines of code, create a cusotm hook named "disclouse" and put these lines in them, as these LOC are appearing multiple times.
  //insted write a single LOC
  const { isOpen, onClose, onOpen } = useDisclouse();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        // const contactsSnapshot = await getDocs(contactsRef);

        //to update data in real time on UI
        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactLists);
          return contactLists;
        });

        // const contactLists = contactsSnapshot.docs.map((doc) => {
        //   return {
        //     id: doc.id,
        //     ...doc.data(),
        //   };
        // });
        // setContacts(contactLists);
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value;

    const contactsRef = collection(db, "contacts");

    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filteredContacts = contactLists.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      );
      setContacts(filteredContacts);
      return filteredContacts;
    });
  };

  return (
    <>
      <div className="max-w-[370px] mx-auto">
        {/* max width property is applied so that the navbar do not exceeds 370px in width on any screen size*/}

        <Navbar />

        <div className="flex gap-2 ">
          <div className="flex relative items-center flex-grow">
            <FiSearch className="text-white absolute text-3xl" />
            <input
              onChange={filterContacts}
              type="text"
              className="bg-transparent border rounded-md border-white h-10 flex-grow text-white pl-8 text-1xl font-mono"
              placeholder="Search here"
            />
          </div>

          <AiOutlinePlusCircle
            onClick={onOpen}
            className="text-white text-4xl cursor-pointer"
          />
        </div>

        <div className="mt-4 flex flex-col gap-3">
          {contacts.length <= 0 ? (
            <NotFoundContact />
          ) : (
            contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))
          )}
        </div>
      </div>

      <AddAndUpdateContact isOpen={isOpen} onClose={onClose} />
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default App;
