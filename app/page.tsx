import MovieApp from "@/components/MovieApp";

export default function Home() {
  return (
    <div className="mx-auto bg-secondary h-dvh flex overflow-y-scroll overscroll-y-none md:w-9/12 lg:w-7/12 xl:w-5/12 min-2xl:w-3xl">
      <MovieApp />
    </div>
  );
}
