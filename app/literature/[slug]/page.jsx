"use client";

import Literature from "../../components/Literature";
import AddEp from "../../components/AddEp";
import { useQuery } from "react-query";
import axios from "axios";
import Image from "next/image";

const fetchDetails = async slug => {
  const response = await axios.get(`/api/lits/${slug}`);
  return response.data;
};

export default function LitDetail(url) {
  const { data, error, isLoading } = useQuery({
    queryFn: () => fetchDetails(url.params.slug),
    queryKey: ["detail-literature"],
  });
  if (error) return error;
  if (isLoading) return "Loading...";

  return (
    <div>
      <Literature
        key={data.id}
        username={data.user.name}
        avatar={data.user.image}
        title={data.title}
        source={data.source}
        id={data.id}
        episodes={data.episodes}
      />
      <AddEp id={data?.id} />
      {data?.episodes.map(ep => (
        <div className="my-6 bg-white p-8 rounded-md" key={ep.id}>
          <div className="flex items-center gap-2">
            <Image
              className="rounded-full"
              width={24}
              height={24}
              src={ep.user?.image}
              alt="avatar"
            />
            <h3 className="font-bold">{ep?.user?.name}</h3>
            <h2 className="text-sm">{ep.createdAt}</h2>
          </div>
          <div className="py-4">{ep.title}</div>
        </div>
      ))}
    </div>
  );
}
