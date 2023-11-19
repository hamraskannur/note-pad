"use client";

import { addNote } from "@/Api/noteApi";
import Header from "@/components/Header/Header";
import ProtectRouter from "@/components/authenticationRoute/protectRouter";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { errorToast, successToast } from "@/components/Toast/Toast";

const page = () => {
  const [backgroundColor, setBackgroundColor] = useState("#f9f8f8");
  const [textColor, setTextColor] = useState("#000");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter()

  const [data, setData] = useState([
    { name: "white", code: "#fff", id: 1 },
    { name: "red", code: "#fa3e3e", id: 2 },
    { name: "blue", code: "#3e3efa", id: 3 },
    { name: "green", code: "#38fe66", id: 4 },
    { name: "black", code: "#000", id: 5 },
    { name: "Yellow", code: "#ecf53e", id: 6 },
    { name: "pink", code: "#f139a7", id: 7 },
  ]);

  const handleChangeBackgroundColor = (event) => {
    setBackgroundColor(event.target.value);
  };

  const handleChangeTextColor = (event) => {
    setTextColor(event.target.value);
    console.log(event.target.value);
  };

  const saveNote = async () => {
    if(title.trim().length>3){

        const data = await addNote({
          title,
          description,
          backgroundColor,
          textColor,
        });
        if (data.status) {
            router.push("/");
            successToast("note saved");
        } else {
            errorToast("some think wrong");
    
        }
    }else{
        errorToast("Please fill in the Title Name");

    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  return (
    <div className=" w-full bg-white dark:bg-gray-900">
      <Header />
      <div className="md:m-20 m-2 md:mt-10 h-full">
        <div>
          <label htmlFor="floating_outlined" className=" text-sm  font-bold">
            Title Name :-
          </label>
          <input
            type="text"
            placeholder=" Title Name..."
            className={` p-3 mt-1    outline-none w-full`}
            style={{ color: textColor, backgroundColor: backgroundColor }}
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="mt-5">
          <label htmlFor="floating_outlined" className=" text-sm  font-bold">
            Description :-
          </label>
          <textarea
            type="text"
            value={description}
            onChange={handleDescriptionChange}
            placeholder=" description..."
            className={`p-3 mt-2 h-[50vh] rounded-xl outline-none w-full`}
            style={{ color: textColor, backgroundColor: backgroundColor }}
          />
        </div>

        <div className="flex w-full">
          <div className=" ml-4">
            <label htmlFor="floating_outlined" className=" text-sm  font-bold">
              text color
            </label>
            <br />
            <select
              className={`bg-[${textColor}] p-2 mt-1 outline-none  w-20`}
              value={textColor}
              onChange={handleChangeTextColor}
            >
              {data.map((item) => (
                <option
                  key={item.id}
                  value={item.code}
                  className={`bg-[${item.code}]`}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="md:ml-8 ml-4 w-full">
            <label htmlFor="floating_outlined" className=" text-sm   font-bold">
              background color
            </label>
            <br />
            <select
              className={`bg-[${backgroundColor}] p-2 mt-1 outline-none  w-20`}
              value={backgroundColor}
              onChange={handleChangeBackgroundColor}
            >
              {data.map((item) => (
                <option
                  key={item.id}
                  value={item.code}
                  className={`bg-[${item.code}]`}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end m-5 w-full">
            <button
              onClick={saveNote}
              type="button"
              className="block rounded-md bg-slate-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-500"
            >
              save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProtectRouter(page);
