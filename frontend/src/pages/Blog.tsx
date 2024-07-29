import AppBar from "../components/AppBar";
import { FullBlog } from "../components/FullBlog";

import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";

// atomFamilies/selectorFamilies
export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({
    id: id || "",
  });

  if (loading || !blog) {
    return (
      <div>
        <AppBar />

        <div className="h-screen flex flex-col justify-center">
          <div className="flex justify-center">
            <Skeleton />
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <AppBar />
      <div>
        <FullBlog blog={blog} />
      </div>
    </>
  );
};

const Skeleton = () => {
  return (
    <div className="grid grid-cols-12 px-10  pt-200  gap-x-3 pt-12 max-w-full min-w-5xl">
      <div className="h-screen w-full col-span-8 bg-gray-200 rounded-xl animate-pulse mt-2"></div>
      <div className="h-20 w-full col-span-4 bg-gray-200 rounded-xl animate-pulse mt-2"></div>
    </div>
  );
};
