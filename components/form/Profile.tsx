"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { ProfileSchema } from "@/lib/validations";

interface Props {
  clerkId: string;
  user: string;
}

const Profile = ({ clerkId, user }: Props) => {
  const path = usePathname();
  const route = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const parsedUser = JSON.parse(user);

  console.log(parsedUser);

  // 1. Define your form.
  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: parsedUser.name || "",
      username: parsedUser.username || "",
      portfolioWebsite: parsedUser.portfolioWebsite || "",
      location: parsedUser.location || "",
      bio: parsedUser.bio || "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof ProfileSchema>) => {
    setIsSubmitting(true);

    try {
      console.log(values);

      // await editProfile({
      //   path: pathname,
      // });

      // route.push(`/profile/${user}`);
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col justify-center gap-10">
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Name <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-2">
                <Input
                  required
                  placeholder="Your name"
                  className="background-light900_dark300 light-border min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-900" />
            </FormItem>
          )}
        />

        {/* Username */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Username <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-2">
                <Input
                  required
                  placeholder="Your username"
                  className="background-light900_dark300 light-border min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-900" />
            </FormItem>
          )}
        />

        {/* PortfolioWebsite */}
        <FormField
          control={form.control}
          name="portfolioWebsite"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">PortfolioWebsite</FormLabel>
              <FormControl className="mt-2">
                <Input
                  type="url"
                  placeholder="Your portfolioWebsite"
                  className="background-light900_dark300 light-border min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-900" />
            </FormItem>
          )}
        />

        {/* Location */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">Location</FormLabel>
              <FormControl className="mt-2">
                <Input
                  placeholder="Where are you from?"
                  className="background-light900_dark300 light-border min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-900" />
            </FormItem>
          )}
        />

        {/* Bio */}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">Bio</FormLabel>
              <FormControl className="mt-2">
                <Input
                  placeholder="What's special about you?"
                  className="background-light900_dark300 light-border min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-900" />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="mt-8 flex justify-end">
          <Button type="submit" disabled={isSubmitting} className="primary-gradient w-fit !text-light-900">
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Profile;
