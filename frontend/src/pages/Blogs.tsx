import AppBar from "../components/AppBar";
import BlogCard from "../components/BlogCard";
import BlogCardSkeleton from "../components/BlogCardSkeleton";
import { useBlogs } from "../hooks";

const Blogs = () => {
  const { loading, blogs } = useBlogs();
  if (loading) {
    return (
      // <div className="flex justify-center h-screen">
      <>
        <AppBar />
        <div className="flex justify-center h-screen ">
          <div className="flex flex-col space-y-5 min-w-3xl ">
            <BlogCardSkeleton />
            <BlogCardSkeleton />
            <BlogCardSkeleton />
          </div>
        </div>
      </>
    );
  }
  // console.log(loading, blogs);
  return (
    <>
      <AppBar />
      <div className="h-screen flex justify-center  ">
        <div className=" space-y-5 max-w-xs sm:max-w-sm  md:max-w-md lg:max-w-3xl">
          {blogs.map((blog) => (
            <BlogCard
              id={blog.id}
              authorName={blog.author.name}
              title={blog.title}
              content={blog.content}
              createdAt={blog.createdAt}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Blogs;
