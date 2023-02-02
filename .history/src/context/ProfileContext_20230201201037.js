import { createContext, useContext } from 'react';
import { db } from '../firebase';
import {
  addDoc,
  collection,
  Timestamp,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import axios from 'axios';

const ProfileContext = createContext();

export function ProfileContextProvider({ children }) {
  const editProfile = async (id, name, phoneNo, img) => {
    const userDoc = doc(db, 'users', id);
    if (img.image) {
      const formdata = new FormData();
      formdata.append('image', img.image);
      const res = await axios.post(
        'https://jobtruckbackend.onrender.com/uploadimg',
        formdata
      );
      const newData = {
        name: name,
        phoneNo: phoneNo,
        dp: res.data.resl.url,
        dpId: res.data.resl.id,
      };
      try {
        await updateDoc(userDoc, newFields).then((a) =>
          toast.success('updated succesfully')
        );
      } catch (error) {
        console.log(error.message);
        toast.error('something went wrong');
      }
    }
  };
}
