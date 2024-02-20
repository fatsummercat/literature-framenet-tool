"use client";
import Image from "next/image";
import Link from "next/link";

export default function Literature({
  username,
  avatar,
  title,
  source,
  id,
  episodes,
  scenarios,
  elements,
}) {
  return (
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
      <div className="my-8">
        <p className="break-all">{title}</p>
        <p className="break-all font-light">{source}</p>
      </div>
      <div className="flex gap-4 cursor-pointer justify-end items-center">
        <Link
          href={{
            pathname: `/literature/${id}`,
          }}
        >
          <p className="text-sm font-bold text-gray-700">
            {episodes?.length} Episodes {">>"}
          </p>
        </Link>
      </div>
    </div>
  );
}
