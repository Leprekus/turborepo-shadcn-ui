import { CSSProperties, ReactNode } from "react";
import { bgStyle } from "../constants";
import { HeroBannerPayload } from "@ui/types";
/**
  props
  {
    subtitle_one: '',
    subtitle_two: '',
    title: '',
    description: '',
    banner: '',
    mini_banner: '',
  }

 */
interface HeroBannerProps {
  Link: ReactNode;
  banner: string;
  payload: HeroBannerPayload;
}
export default function HeroBanner({ Link, payload }: HeroBannerProps) {
  return (
    <div
      className="
  items-end
  min-h-screen w-screen flex md:items-center justify-center"
      style={bgStyle(payload?.banner_img)}
    >
      <div
        className="flex w-full px

    items-center
    md:px-10
    md:justify-between
    "
      >
        <div
          className="
      md:w-[400px]
      lg:w-[600px]
      text-white
      flex
      flex-col
      gap-4
      p-4
      md:p-0
      "
        >
          <div className="uppercase text-white flex gap-4">
            <span>{payload?.subtitle_1}</span>
            <span>{payload?.subtitle_2}</span>
          </div>
          <h1 className="uppercase text-5xl font-medium">{payload?.title}</h1>
          <p className="hidden md:block">{payload?.description}</p>
          {Link}
        </div>

        {/* <div className='
        hidden
        md:block
        relative
        md:w-[200px]
        md:h-[300px]
        lg:w-[400px]
        lg:h-[500px]
        '>
          <Image
            alt='hero banner'
            src={miniBanner}
            fill
            />
        </div> */}
      </div>
    </div>
  );
}
