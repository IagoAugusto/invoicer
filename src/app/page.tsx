async function getData() {
  const res = await fetch("http://localhost:3000/invoices", { method: "GET" });
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

interface Data {
  name: string;
}

async function Home() {
  const data: Data = await getData();
  return <div>{data.name}</div>;
}

export default Home;
