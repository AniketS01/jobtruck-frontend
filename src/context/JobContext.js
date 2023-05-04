import { createContext, useContext } from "react";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  Timestamp,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import axios from "axios";

const JobContext = createContext();

export function JobContextProvider({ children }) {
  const postJob = (
    name,
    email,
    title,
    type,
    address,
    timingStart,
    timeingEnd,
    salary,
    skills,
    phone,
    description,
    image,
    imageId,
    state,
    city
  ) => {
    return addDoc(collection(db, "jobs"), {
      name: name,
      email: email,
      title: title,
      type: type,
      address: address,
      startTime: timingStart,
      endTime: timeingEnd,
      salary: salary,
      skills: skills,
      phone: phone,
      description: description,
      postedOn: Timestamp.now(),
      imageUrl: image,
      imageId: imageId,
      state: state,
      city: city,
    }).then((a) => toast.success("posted"));
  };

  const editJob = async (
    id,
    title,
    type,
    address,
    timingStart,
    timeingEnd,
    salary,
    skills,
    phone,
    description,
    imgdata,
    state,
    city
  ) => {
    const userDoc = doc(db, "jobs", id);

    if (imgdata.image) {
      const formdata = new FormData();
      formdata.append("image", imgdata.image);
      const res = await axios.post(
        "https://jobtruckbackend.onrender.com/uploadimg",
        formdata
      );
      const newFields = {
        title: title,
        type: type,
        address: address,
        startTime: timingStart,
        endTime: timeingEnd,
        salary: salary,
        skills: skills,
        phone: phone,
        description: description,
        imageUrl: res.data.resl.url,
        imageId: res.data.resl.id,
        state: state,
        city: city,
      };
      try {
        await updateDoc(userDoc, newFields).then((a) =>
          toast.success("updated succesfully")
        );
      } catch (error) {
        console.log(error.message);
        toast.error("something went wrong");
      }
    } else {
      const newFields = {
        title: title,
        type: type,
        address: address,
        startTime: timingStart,
        endTime: timeingEnd,
        salary: salary,
        skills: skills,
        phone: phone,
        description: description,
        state: state,
        city: city,
      };
      try {
        await updateDoc(userDoc, newFields).then((a) =>
          toast.success("updated succesfully")
        );
      } catch (error) {
        console.log(error.message);
        toast.error("something went wrong");
      }
    }
  };

  const deleteJob = async (id) => {
    const jobRef = doc(db, "jobs", id);
    await deleteDoc(jobRef).then((a) => toast.success("job removed"));
  };

  return (
    <JobContext.Provider value={{ postJob, deleteJob, editJob }}>
      {children}
    </JobContext.Provider>
  );
}

export function UserJob() {
  return useContext(JobContext);
}
