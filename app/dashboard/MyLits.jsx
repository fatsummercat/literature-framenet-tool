"use client";

import axios from "axios";
import { useQuery } from "react-query";
import EditLit from "./EditLit";

const fetchAuthLits = async () => {
  const response = await axios.get("/api/lits/authLits");
  return response.data;
};

export default function MyLits() {
  const { data, error, isLoading } = useQuery({
    queryFn: fetchAuthLits,
    queryKey: ["auth-literatures"],
  });
  if (error) return error;
  if (isLoading) return "Loading...";

  return (
    <div>
      {data?.literatures.map(literature => (
        <EditLit
          key={literature.id}
          id={literature.id}
          avatar={data.image}
          username={data.name}
          title={literature.title}
          source={literature.source}
          episodes={literature.episodes}
        />
      ))}
    </div>
  );
}
