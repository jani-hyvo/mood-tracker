import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { supabase } from '@/lib/supabaseClient';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/shadcn/form';
import { Input } from '@/components/shadcn/input';
import { Button } from '@/components/shadcn/button';

export default function Login() {
  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) alert(error.message);
  };

  const signInDemo = async () => {
    await supabase.auth.signInWithPassword({
      email: import.meta.env.VITE_DEMO_EMAIL,
      password: import.meta.env.VITE_DEMO_PASSWORD,
    });
  };

  const formSchema = z.object({
    email: z.string().min(1, {
      message: 'Please enter a valid email.',
    }),
    password: z.string().min(1, {
      message: 'Please enter your password.',
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: import.meta.env.VITE_DEMO_EMAIL,
      password: import.meta.env.VITE_DEMO_PASSWORD,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    signIn(values.email, values.password);
  };

  const onReset = () => {
    form.reset({
      email: '',
      password: '',
    });
  };

  return (
    <div className="flex flex-col items-center p-7 rounded-2xl">
      <Form {...form}>
        <Card className="w-full max-w-lg">
          <form onSubmit={form.handleSubmit(onSubmit)} onReset={onReset} className="space-y-8">
            <CardHeader>
              <CardTitle>Demo</CardTitle>
              <CardDescription>View a demo of this application by clicking 'View demo'.</CardDescription>
              <CardAction>
                <Button onClick={signInDemo} variant="demo">
                  View demo
                </Button>
              </CardAction>
            </CardHeader>
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>Enter your credentials below to login</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="email@example.com" type="email" required id="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" required id="password" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button type="reset" variant="outline" className="w-full">
                Reset
              </Button>
            </CardFooter>
          </form>
        </Card>
      </Form>
    </div>
  );
}
