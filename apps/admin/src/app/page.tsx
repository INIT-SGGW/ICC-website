import { HomeNav } from "../Views/Home/HomeNav";

export default function Page(): JSX.Element {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-cred text-6xl">Admin Panel</h1>
      <HomeNav />
    </div>
  );
}
