import { blog } from "../hooks";
import { formatDate } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: blog | undefined }) => {
  return (
    <div>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-12 px-10 w-full pt-200 max-w-screen-xl gap-x-3 pt-12">
          <div className="order-2  md:col-span-8 md:order-none ">
            <div className="text-5xl font-extrabold">{blog?.title}</div>
            <div className="text-slate-500 pt-2">{`post on ${formatDate(
              blog?.createdAt
            )}`}</div>
            <div
              className="pt-4"
              dangerouslySetInnerHTML={{ __html: blog?.content || "NONE" }}
            />
            {/* {blog?.content}</div> */}
          </div>
          <div className="order-1 mb-8 md:col-span-4 md:order-none">
            <div className="text-slate-600 text-lg">Author</div>
            <div className="flex w-full">
              <div className="pr-4 flex flex-col justify-center">
                <Avatar authorName={blog?.author.name || "An"} />
              </div>
              <div>
                <div className="text-xl font-bold">
                  {blog?.author.name || "Anonymous"}
                </div>
                <div className="pt-2 text-slate-500">
                  Let's spread the knowledge.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function Avatar({ authorName }: { authorName: string }) {
  return (
    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full">
      <span className="font-medium text-gray-800 dark:text-gray-300">
        {authorName[0]}
      </span>
    </div>
  );
}
