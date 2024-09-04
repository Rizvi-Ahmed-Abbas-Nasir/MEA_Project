import Link from "next/link";
export default function NavHeaders() {
  return (
    <ul className="flex flex-col w-full">
      <NavItem href="/" label="Home" />
      <NavItem href="/Admin/Members" label="Members" />
      <NavItem href="/Admin/member_req" label="Member's Request" />
      <NavItem href="/Admin/replies" label="Replies" />
      <NavItem href="/Admin/Events" label="Events" />
      <NavItem href="/Admin/gallery" label="Gallery" />
      <NavItem href="/Admin/honorory" label="Honorary Members" />
    </ul>
  );
}

function NavItem({ href, label }) {
  return (
    <li className="w-full">
      <Link href={href}>
        <p className="block w-full py-4 px-6 text-center text-lg font-medium transition-colors duration-300 ease-in-out border-b border-red-700 hover:bg-red-600">
          {label}
        </p>
      </Link>
    </li>
  );
}