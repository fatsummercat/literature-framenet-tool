"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddLit() {
  const [title, setTitle] = useState("");
  const [source, setSource] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();
  const lenThreshold = 200;
  let toastPostID = null;

  const { mutate } = useMutation(
    async data => await axios.post("/api/lits/addLit", { data }),
    {
      onError: error => {
        toast.error(error?.response?.data.message, { id: toastPostID });
        setIsDisabled(false);
      },
      onSuccess: data => {
        queryClient.invalidateQueries(["literatures"]);
        toast.success("Literature has been added 🔥", { id: toastPostID });
        setTitle("");
        setSource("");
        setIsDisabled(false);
      },
    }
  );

  const submitLit = async e => {
    e.preventDefault();
    toastPostID = toast.loading("Adding your literature", { id: toastPostID });
    setIsDisabled(true);
    mutate({ title, source });
  };

  return (
    <form onSubmit={submitLit} className="bg-white my-8 p-8 rounded-md ">
      <div className="flex flex-col my-4">
        <textarea
          onChange={e => setTitle(e.target.value)}
          name="title"
          value={title}
          placeholder="Literature title"
          className="p-4 text-lg rounded-md my-2 bg-gray-200"
        ></textarea>
      </div>
      <p
        className={`font-bold text-sm ${
          title.length > lenThreshold ? "text-red-700" : "text-gray-700"
        }`}
      >
        {title.length}/{lenThreshold.toString()}
      </p>
      <div className="flex flex-col my-4">
        <textarea
          onChange={e => setSource(e.target.value)}
          name="source"
          value={source}
          placeholder="Literature source"
          className="p-4 text-lg rounded-md my-2 bg-gray-200"
        ></textarea>
      </div>
      <div className="flex items-center justify-between gap-2">
        <p
          className={`font-bold text-sm ${
            source.length > lenThreshold ? "text-red-700" : "text-gray-700"
          }`}
        >
          {source.length}/{lenThreshold.toString()}
        </p>
        <button
          disabled={isDisabled}
          className="text-sm bg-blue-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
          type="submit"
        >
          Add literature
        </button>
      </div>
    </form>
  );
}
