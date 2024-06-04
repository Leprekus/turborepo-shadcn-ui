import HeroBanner from "@repo/ui/components/storefront/hero-banner";
import banner from '../public/banner.jpg'
import Link from "next/link";

export default function Page() {
  return (
    <HeroBanner
      Link={
        <Link href="" className="underline uppercase">
          LINK
        </Link>
      }
      banner={banner.src}
    />
  );
}
