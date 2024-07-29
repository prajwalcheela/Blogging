import { Link } from "react-router-dom";

interface BlogCardTypes {
  id: string;
  title: string;
  content: string;
  authorName: string;
  createdAt: string;
}

const BlogCard = ({
  authorName,
  title,
  content,
  createdAt,
  id,
}: BlogCardTypes) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="border-b py-6 cursor-pointer">
        <div className="flex mb-2  ">
          <div className=" pr-2">
            <Avatar authorName={authorName} />
          </div>
          <div className="flex items-center">
            <div className="text-sm mr-2 font-normal">{authorName}</div>
            <div className="text-slate-400 text-sm">
              {formatDate(createdAt)}
            </div>
          </div>
        </div>
        <div className="text-2xl font-bold mb-1">{title}</div>
        <div
          className="text-slate-600"
          dangerouslySetInnerHTML={{ __html: content.slice(0, 250) + "..." }}
        />
        {/* welcome to our blogging site welcome to our blogging site welcome to our
        blogging site welcome to our blogging site welcome to our blogging site
        welcome to our blogging site */}
        {/*         
          {HTMLReactParser(content.slice(0, 250)) + "...." da}
        </div>  */}
        <div className="mt-6 text-slate-400 text-xs">{`${Math.ceil(
          content.length / 1000
        )} minute(s) read`}</div>
      </div>
    </Link>
  );
};

function Avatar({ authorName }: { authorName: string }) {
  return (
    <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full">
      <span className="font-medium text-gray-600 dark:text-gray-300">
        {authorName[0]}
      </span>
    </div>
  );
}
export function formatDate(dateString: string | undefined): string {
  const inp = dateString || "2024-07-28T11:42:17.815Z";
  const date = new Date(inp);
  if (isNaN(date.getTime())) {
    console.log("date error");
    throw new Error("Invalid date string provided.");
  }
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
}

export default BlogCard;
