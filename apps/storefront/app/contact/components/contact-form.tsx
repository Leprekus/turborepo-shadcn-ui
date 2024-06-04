'use client'
import { Button } from '@ui/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@ui/components/ui/form';
import { Input } from '@ui/components/ui/input';
import { Textarea } from '@ui/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod'
export default function ContactForm() {

	const phoneRegex = new RegExp(
		/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
	  );

	const formSchema = z.object({
		first_name: z.string().min(2, 'Name required').max(50),
		last_name: z.string().min(2, 'Last name required').max(50),
		email: z.string().min(2, 'Invalid Email').max(50).email('Invalid email'),
		phone: z.string().regex(phoneRegex, 'Invalid phone number'),
		notes: z.string(),

	})

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			first_name: '',
			last_name:'',
			email:'',
			phone:'',
			notes:'',
		}
	})

	const onSubmit = () => {}

  return (
	<Form {...form}>
		<form onSubmit={form.handleSubmit(onSubmit)}>
			<div className='flex'>
				<FormField
					control={form.control}
					name='first_name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>First Name</FormLabel>
							<FormControl>
								<Input placeholder='John' {...field}/>
							</FormControl>
							<FormDescription>
								Enter your first name
							</FormDescription>
							<FormMessage/>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='last_name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Last Name</FormLabel>
							<FormControl>
								<Input placeholder='Snow' {...field}/>
							</FormControl>
							<FormDescription>
								Enter your last name
							</FormDescription>
							<FormMessage/>
						</FormItem>
					)}
				/>
			</div>

			<FormField
				control={form.control}
				name='email'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Email</FormLabel>
						<FormControl>
							<Input type='email' placeholder='abc@mail.com' {...field}/>
						</FormControl>
						<FormDescription>
							Enter your email
						</FormDescription>
						<FormMessage/>
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name='phone'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Phone</FormLabel>
						<FormControl>
							<Input type='tel' placeholder='+1(123)-456-7890' {...field}/>
						</FormControl>
						<FormDescription>
							Enter your phone number
						</FormDescription>
						<FormMessage/>
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name='notes'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Notes</FormLabel>
						<FormControl>
							<Textarea placeholder='Notes...' {...field}/>
						</FormControl>
						<FormDescription>
							Provide any additional details
						</FormDescription>
						<FormMessage/>
					</FormItem>
				)}
			/>
			<Button type='submit'>Submit</Button>
		</form>
	</Form>
  )
}
