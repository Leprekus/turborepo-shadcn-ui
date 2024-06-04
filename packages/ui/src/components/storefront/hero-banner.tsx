

import { CSSProperties, ReactNode } from 'react';
import { bgStyle } from '../constants';
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
  Link: ReactNode
  banner: string
}
export default function HeroBanner({ Link, banner }: HeroBannerProps) {

  return (
	<div className='
  items-end
  min-h-screen w-screen flex md:items-center justify-center' style={bgStyle(banner)}>

    <div className='flex w-full px

    items-center
    md:px-10
    md:justify-between
    '>

      <div className='
      md:w-[400px]
      lg:w-[600px]
      text-white
      flex
      flex-col
      gap-4
      p-4
      md:p-0
      '>
        <div className='uppercase text-white flex gap-4'>
          <span>RCHVE</span>
          <span>issue: no 3</span>
        </div>
        <h1 className='uppercase text-5xl font-medium'>
          UR-VAN
          </h1>
        <p className='hidden md:block'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum, libero ducimus error tempore facere, commodi corporis voluptas similique, quam laboriosam voluptates quidem id sed ipsam incidunt soluta dicta nulla labore.
        </p>
        { Link }
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
  )
}
