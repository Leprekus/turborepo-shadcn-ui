import { cn } from '@ui/lib/utils';

interface HeadingProps { title: string, className?: string }
export default function Heading({ title, className }: HeadingProps) {
  return (
	<h1 className={cn(`text-5xl text-zinc-400 uppercase py-10 px-4 font-light w-fit`, className)}>{ title }</h1>
  )
}
