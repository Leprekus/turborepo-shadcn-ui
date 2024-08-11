import HeroBanner from "@repo/ui/components/storefront/hero-banner";
import banner from '../public/banner.jpg'
import Link from "next/link";
import { HeroBannerPayload } from '../../../packages/ui/src/types';

export default async function Page() {
  const url = process.env.ADMIN_URL + '/api/website/content/about'
  const res = await fetch(url)
  const { data } = await res.json()
  const payload: HeroBannerPayload = data

  return (
    <HeroBanner
    payload={payload}
      Link={
        <Link href={ payload.link_address } className="underline uppercase">
          { payload.link_title }
        </Link>
      }
      banner={banner.src}
    />
  );
}
