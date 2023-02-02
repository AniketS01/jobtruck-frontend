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
  const editProfile = (name, phoneNo, img) => {};
}
