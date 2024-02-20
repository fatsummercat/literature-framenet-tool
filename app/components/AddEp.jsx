"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export default function AddEp({ id }) {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();
  const lenThreshold = 200;
  let toastPostID;

  const { mutate } = useMutation(
    async data => await axios.post("/api/lits/addEp", { data }),
    {
      onError: error => {
        toast.error(error?.response?.data.message, { id: toastPostID });
        setIsDisabled(false);
      },
      onSuccess: data => {
        queryClient.invalidateQueries(["detail-literature"]);
        toast.success("Episode has been added 🔥", { id: toastPostID });
        setTitle("");
        setIsDisabled(false);
      },
    }
  );

  const submitEp = async e => {
    e.preventDefault();
    toastPostID = toast.loading("Adding your episode", { id: toastPostID });
    setIsDisabled(true);
    mutate({ title, literatureId: id });
  };

  return (
    <form onSubmit={submitEp} className="my-8">
      <h3 className="text-xl">Add episode</h3>

      <div className="flex flex-col my-2">
        <input
          onChange={e => setTitle(e.target.value)}
          value={title}
          type="text"
          name="title"
          className="p-4 text-lg rounded-md my-2"
          placeholder="Episode title"
        />
      </div>

      <div className="flex justify-between items-center gap-2 px-2">
        <p
          className={`font-bold  ${
            title.length > lenThreshold ? "text-red-700" : "text-gray-700"
          } `}
        >{`${title.length}/${lenThreshold}`}</p>
        <button
          disabled={isDisabled}
          className="text-sm bg-blue-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
          type="submit"
        >
          Add Episode 🚀
        </button>
      </div>
    </form>
  );
}
