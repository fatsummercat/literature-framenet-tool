"use client";

import axios from "axios";
import AddLit from "./components/AddLit";
import { useQuery } from "react-query";
import Literature from "./components/Literature";

const fetchLits = async () => {
  const response = await axios.get("/api/lits/getLits");
  return response.data;
};

export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryFn: fetchLits,
    queryKey: ["literatures"],
  });
  if (error) return error;
  if (isLoading) return "Loading...";

  return (
    <main>
      <AddLit />
      {data?.map(literature => (
        <Literature
          key={literature.id}
          username={literature.user.name}
          avatar={literature.user.image}
          title={literature.title}
          source={literature.source}
          id={literature.id}
          episodes={literature.episodes}
          scenarios={literature.scenarios}
          elements={literature.elements}
        />
      ))}
    </main>
  );
}
