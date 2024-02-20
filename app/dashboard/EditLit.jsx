"use client";

import Image from "next/image";
import Link from "next/link";
import Modal from "./Modal";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import toast from "react-hot-toast";

export default function EditLit({
  avatar,
  username,
  title,
  source,
  episodes,
  id,
}) {
  const [toggle, setToggle] = useState(false);
  const queryClient = useQueryClient();
  let deleteToastID = null;

  const { mutate } = useMutation(
    async id => await axios.delete("/api/lits/deleteLit", { data: id }),
    {
      onError: error => {
        console.log(error);
        toast.error("Error deleting literature", {
          id: deleteToastID,
        });
      },
      onSuccess: data => {
        console.log(data);
        queryClient.invalidateQueries(["auth-literatures"]);
        toast.success("Literature has been deleted", {
          id: deleteToastID,
        });
      },
    }
  );

  const deleteLit = () => {
    deleteToastID = toast.loading("Deleting literature...", {
      id: deleteToastID,
    });
    mutate(id);
  };

  return (
    <>
      <div className="bg-white my-8 p-8 rounded-lg">
        <div className="flex items-center gap-2">
          <Image
            className="rounded-full"
            width={32}
            height={32}
            src={avatar}
            alt="avatar"
          />
          <h3 className="font-bold text-gray-700">{username}</h3>
        </div>
        <div className="my-8 ">
          <p className="break-all">{title}</p>
          <p className="break-all font-light">{source}</p>
        </div>
        <div className="flex gap-4 cursor-pointer justify-between items-center">
          <Link
            href={{
              pathname: `/literature/${id}`,
            }}
          >
            <p className="text-sm font-bold text-gray-700">
              {episodes?.length} Episodes {">>"}
            </p>
          </Link>
          <button
            className="text-sm font-bold text-red-500"
            onClick={e => {
              e.stopPropagation();
              setToggle(true);
            }}
          >
            Delete
          </button>
        </div>
      </div>
      {toggle && <Modal deleteLit={deleteLit} setToggle={setToggle} />}
    </>
  );
}
