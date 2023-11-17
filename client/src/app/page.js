"use client";
import { getAllNotes } from "@/Api/noteApi";
import Header from "@/components/Header/Header";
import ProtectRouter from "@/components/authenticationRoute/protectRouter";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function Home() {
  const [notes, setNotes] = useState([]);
  const [subNots, setSubNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const res = await getAllNotes();
      console.log(res);
      setNotes(res.notes);
      setSubNotes(res.notes);
    })();
  }, []);

  useEffect(() => {
    setNotes(subNots);
    if (searchQuery.trim().length !== 0) {
      const filteredNotes = notes.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setNotes(filteredNotes);
    }
  }, [searchQuery]);

  return (
    <div className="h-screen w-full bg-white dark:bg-gray-900">
      <Header />
      <div className="flex md:m-20 mt-5 m-2 md:mt-10 justify-center">
        <div className="w-full">
          <div className="flex border-2 m-2 bg-[#F8F9F9]">
            <svg
              className="w-4 mt-4 ml-2 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              type="text"
              placeholder="Search by Title Name..."
              className=" p-3 bg-[#F8F9F9] outline-none w-full"
            />
          </div>
          <table className="table-auto h-full w-full">
            <thead>
              <tr className="bg-[#F0F3F4] ">
                <th className="py-3">Title</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {notes?.length > 0 ? (
                notes.map((item) => (
                  <tr
                    key={item._id}
                    onClick={() =>
                      router.push(`/page/${item._id}`, undefined, {
                        shallow: true,
                      })
                    }
                    className="border-b-2 bg-[#FBFCFC]  hover:bg-[#dfe1e1] cursor-pointer"
                  >
                    <td className="py-2 text-center ">{item.title}</td>
                    <td className="py-2 text-center ">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <th>open</th>
                  </tr>
                ))
              ) : (
                <button
                  onClick={() => router.push("/page")}
                  className="block my-auto mt-5 mx-auto  rounded-md bg-slate-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-500"
                >
                  Create a new note
                </button>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProtectRouter(Home);
