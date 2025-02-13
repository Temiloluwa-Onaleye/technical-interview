"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@/components/_shared/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/_shared/form";
import { Input } from "@/components/_shared/input";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  content: z.string().min(2, {
    message: "Content must be at least 2 characters.",
  }),
});

export default function Home() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const newPost = {
      id: uuidv4(), // Generate a unique ID for the post
      title: values.title,
      content: values.content,
      timestamp: new Date().toLocaleDateString(),
    };

    const existingPosts = JSON.parse(localStorage.getItem("Posts") || "[]");

    // Add the new post to the array
    const updatedPosts = [...existingPosts, newPost];

    localStorage.setItem("Posts", JSON.stringify(updatedPosts));

    router.push("/form-information");
    console.log(values);
  }

  return (
    <div className="container mx-auto max-w-[700px] my-20 p-4">
      <h1 className="text-3xl font-bold mb-6">Create a New Post</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter title" {...field} required />
                </FormControl>
                <FormDescription>This is your Title.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Input placeholder="Enter content" {...field} required />
                </FormControl>
                <FormDescription>This is your Content.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="bg-white text-black" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
