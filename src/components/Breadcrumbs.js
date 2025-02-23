import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter((x) => x);

  return (
    <nav aria-label="breadcrumb">
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        {paths.map((path, index) => {
          const url = `/${paths.slice(0, index + 1).join("/")}`;
          return (
            <li key={index}>
              <Link href={url}>{path}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
