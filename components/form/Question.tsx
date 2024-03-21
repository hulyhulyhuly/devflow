"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRef } from "react";

import { z } from "zod";
import { Editor } from "@tinymce/tinymce-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { QuestionsSchema } from "@/lib/validations";
import { Badge } from "../ui/badge";
import Image from "next/image";

const Question = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof QuestionsSchema>>({
    resolver: zodResolver(QuestionsSchema),
    defaultValues: {
      title: "",
      explanation: "",
      tags: [],
    },
  });

  // 2. Define a submit handler.
  const onSubmit = (values: z.infer<typeof QuestionsSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  };

  const editorRef = useRef(null);

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (field.name !== "tags" || e.key !== "Enter") {
      return;
    }

    e.preventDefault();

    const tagInput = e.target as HTMLInputElement;
    const tagValue = tagInput.value.trim();

    if (tagValue === "") {
      form.trigger();
    }

    if (tagValue.length > 15) {
      return form.setError("tags", {
        type: "required",
        message: "Tag must be less than characters.",
      });
    }

    if (!field.value.includes(tagValue)) {
      form.setValue("tags", [...field.value, tagValue]);
      tagInput.value = "";
      form.clearErrors("tags");
    }
  };

  const handleTagRemove = (tag: string, field: any) => {
    const newTags = field.value.filter((t: string) => t !== tag);
    form.setValue("tags", newTags);
  };

  return (
    <>
      <h2 className="h2-bold text-dark400_light800 mb-4">
        Ask a public question
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col items-center justify-center gap-10"
        >
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Question Title <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className="mt-2">
                  <Input
                    required
                    placeholder="shadcn"
                    className="background-light900_dark300 light-border min-h-[56px] border"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="body-regular mt-2 text-light-500">
                  Be specific and imagine you&apos;re asking a question to
                  another person.
                </FormDescription>
                <FormMessage className="text-red-900" />
              </FormItem>
            )}
          />

          {/* Explanation */}
          <FormField
            control={form.control}
            name="explanation"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Detailed explanation of your problem{" "}
                  <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className="mt-2">
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                    onInit={(evt, editor) => {
                      // @ts-ignore
                      editorRef.current = editor;
                    }}
                    initialValue=""
                    init={{
                      height: 350,
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "codesample",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "code",
                        "help",
                        "wordcount",
                      ],
                      toolbar:
                        "undo redo | " +
                        "codesample | bold italic forecolor | " +
                        "alignleft aligncenter alignright alignjustify | " +
                        "bullist numlist",
                      content_style:
                        "body { font-family:Inter; font-size:16px }",
                    }}
                  />
                </FormControl>
                <FormDescription className="body-regular mt-2 text-light-500">
                  Introduce the problem and expand on what you put in the title.
                  Minimum 20 characters.
                </FormDescription>
                <FormMessage className="text-red-900" />
              </FormItem>
            )}
          />

          {/* Tags */}
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Tags <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className="mt-2">
                  <>
                    <Input
                      required
                      placeholder="Add tags..."
                      className="background-light900_dark300 light-border min-h-[56px] border"
                      onKeyDown={(e) => handleInputKeyDown(e, field)}
                    />

                    {/* Display Tags */}
                    {field.value.length > 0 && (
                      <div className="mt-2 flex items-center gap-2">
                        {field.value.map((tag: any) => (
                          <Badge
                            key={tag}
                            className="subtle-medium text-light400_light500 background-light800_dark300 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize"
                          >
                            {tag}
                            <Image
                              src="/assets/icons/close.svg"
                              alt="delete tag"
                              width={12}
                              height={12}
                              className="cursor-pointer object-contain dark:invert"
                              onClick={() => handleTagRemove(tag, field)}
                            />
                          </Badge>
                        ))}
                      </div>
                    )}
                  </>
                </FormControl>
                <FormDescription className="body-regular mt-2 text-light-500">
                  Add up to 5 tags to describe what your question is about.
                  Start typing to see suggestions.
                </FormDescription>
                <FormMessage className="text-red-900" />
              </FormItem>
            )}
          />
          <Button type="submit" className="border shadow">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};

export default Question;
