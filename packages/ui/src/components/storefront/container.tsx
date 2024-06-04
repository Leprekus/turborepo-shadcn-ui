import { cn } from '@ui/lib/utils';
import { type ReactNode } from 'react';

interface ContainerProps { children: ReactNode, className?: string }
export default function Container({ children, className }: ContainerProps) {

  //default padding to take navbar into acct 14 + regular padding 10 = 24
  return (
	<div className={cn('pt-24 pb-10 px-10 min-h-screen', className)}>
		{ children }
	</div>
  )
}
