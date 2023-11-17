"use client";

import Header from "@/components/Header/Header";
import ProtectRouter from "@/components/authenticationRoute/protectRouter";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getNote, noteUpdate } from "@/Api/noteApi";
import { errorToast, successToast } from "@/components/Toast/Toast";

const page = () => {
  const [edit, setEdit] = useState(false);
  const [note, setNote] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#f9f8f8");
  const [textColor, setTextColor] = useState("#000");
  const params = useParams();
  const router = useRouter();

  const noteId = params.id;
  useEffect(() => {
    (async () => {
      const res = await getNote(noteId);
      if (res.status) {
        setNote(res.note);
        setBackgroundColor(res.note.backgroundColor);
        setTextColor(res.note.textColor);
      } else {
        router.push("/login");
      }
    })();
  }, []);

  const [data, setData] = useState([
    { name: "white", code: "#fff", id: 1 },
    { name: "red", code: "#fa3e3e", id: 2 },
    { name: "blue", code: "#3e3efa", id: 3 },
    { name: "green", code: "#38fe66", id: 4 },
    { name: "black", code: "#000", id: 5 },
    { name: "Yellow", code: "#ecf53e", id: 6 },
    { name: "pink", code: "#f139a7", id: 7 },
    { name: "gray", code: "#f9f8f8", id: 7 },
  ]);

  const handleChangeBackgroundColor = (event) => {
    setBackgroundColor(event.target.value);
  };

  const handleChangeTextColor = (event) => {
    setTextColor(event.target.value);
    console.log(event.target.value);
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setNote({
      ...note,
      [name]: value,
    });
  };

  const saveNote = async () => {
    if (note.title.trim().length > 3) {
      const data = await noteUpdate(note);

      if (data.status) {
        setNote(data.note);
        successToast("Note updated successfully");
      } else {
        errorToast("some think wrong");
      }
   
    } else {
      errorToast("Please fill in the Title Name");
    }
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
            readOnly={edit ? false : true}
            type="text"
            name="title"
            placeholder=" Title Name..."
            className={` p-3 mt-1    outline-none w-full`}
            style={{ color: textColor, backgroundColor: backgroundColor }}
            value={note.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-5">
          <label htmlFor="floating_outlined" className=" text-sm  font-bold">
            Description :-
          </label>
          <textarea
            readOnly={edit ? false : true}
            type="text"
            placeholder=" description..."
            name="description"
            className={`p-3 mt-2 h-[50vh] rounded-xl outline-none w-full`}
            value={note.description}
            style={{ color: textColor, backgroundColor: backgroundColor }}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex w-full">
          {edit ? (
            <>
              <div className=" ml-4">
                <label
                  htmlFor="floating_outlined"
                  className=" text-sm  font-bold"
                >
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
                <label
                  htmlFor="floating_outlined"
                  className=" text-sm   font-bold"
                >
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
                <button onClick={saveNote } className="block    rounded-md bg-slate-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-500">
                  save
                </button>
              </div>
            </>
          ) : (
            <div className="flex justify-end m-5 w-full">
              <button
                onClick={() => setEdit(true) }
                className="block    rounded-md bg-slate-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-500"
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProtectRouter(page);
