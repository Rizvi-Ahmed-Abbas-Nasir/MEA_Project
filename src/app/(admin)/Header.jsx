import Link from "next/link";

export default function Headers() {
  return (
    <div className="w-full  h-full  flex flex-col">
      <ul className="flex flex-col items-center py-4 space-y-2">
        <li className="w-full">
          <Link href="/" className="group">
            <p className="text-white text-[0.9rem] xl:text-[1.2rem] h-[7vh] flex items-center justify-center border-y-[2px] border-transparent group-hover:border-red-500 group-hover:bg-red-500 w-full transition-all duration-300 ease-in-out">
             Home
            </p>
          </Link>
        </li>
        <li className="w-full">
          <Link href="/Admin/Members" className="group">
            <p className="text-white text-[0.9rem] xl:text-[1.2rem] h-[7vh] flex items-center justify-center border-y-[2px] border-transparent group-hover:border-red-500 group-hover:bg-red-500 w-full transition-all duration-300 ease-in-out">
              Members
            </p>
          </Link>
        </li>
        <li className="w-full">
          <Link href="/Admin/member_req" className="group">
            <p className="text-white text-[0.9rem] xl:text-[1.2rem] h-[7vh] flex items-center justify-center border-y-[2px] border-transparent group-hover:border-red-500 group-hover:bg-red-500 w-full transition-all duration-300 ease-in-out">
              Member&apos;s Request
            </p>
          </Link>
        </li>
        <li className="w-full">
          <Link href="/Admin/replies" className="group">
            <p className="text-white text-[0.9rem] xl:text-[1.2rem] h-[7vh] flex items-center justify-center border-y-[2px] border-transparent group-hover:border-red-500 group-hover:bg-red-500 w-full transition-all duration-300 ease-in-out">
              Replies
            </p>
          </Link>
        </li>
        <li className="w-full">
          <Link href="/Admin/Events" className="group">
            <p className="text-white text-[0.9rem] xl:text-[1.2rem] h-[7vh] flex items-center justify-center border-y-[2px] border-transparent group-hover:border-red-500 group-hover:bg-red-500 w-full transition-all duration-300 ease-in-out">
              Events
            </p>
          </Link>
        </li>
        <li className="w-full">
          <Link href="/Admin/gallery" className="group">
            <p className="text-white text-[0.9rem] xl:text-[1.2rem] h-[7vh] flex items-center justify-center border-y-[2px] border-transparent group-hover:border-red-500 group-hover:bg-red-500 w-full transition-all duration-300 ease-in-out">
              Gallery
            </p>
          </Link>
        </li>
        <li className="w-full">
          <Link href="/Admin/honorory" className="group">
            <p className="text-white text-[0.9rem] xl:text-[1.2rem] h-[7vh] flex items-center justify-center border-y-[2px] border-transparent group-hover:border-red-500 group-hover:bg-red-500 w-full transition-all duration-300 ease-in-out">
              Honorary Members
            </p>
          </Link>
        </li>
      </ul>
    </div>
  );
}
