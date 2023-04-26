import React from "react";
import { PostOperations } from "./CommentOperations";
import { UserAvatar } from "../UserAvatar";
import type { Comment as CommentType } from "@prisma/client";

type CommentProps = CommentType & {
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
};

export const PostItem: React.FC<CommentProps> = ({
  id,
  recipe_id,
  createdAt,
  text,
  user,
}) => {
  console.log(text);
  return (
    <div className="space-y-4">
      <div className="flex">
        <div className="mr-3 flex-shrink-0">
          {/* <img
              className="mt-2 h-8 w-8 rounded-full sm:h-10 sm:w-10"
              src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
              alt=""
            /> */}
          <UserAvatar
            className="mt-2 h-8 w-8 rounded-full sm:h-10 sm:w-10"
            user={{
              name: user && user.name ? user.name : "Anonymous",
              image:
                user && user.image
                  ? user.image
                  : "https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
            }}
          />
        </div>

        <div className="flex-1 rounded-lg border px-4 py-2 leading-relaxed sm:px-6 sm:py-4">
          <div className="flex items-center">
            <strong>{user && user.name ? user.name : "Anonymous"}</strong>{" "}
            <span className="mx-2 text-xs text-gray-400">
              {createdAt instanceof Date
                ? createdAt.toLocaleDateString()
                : new Date().toLocaleDateString()}
              {/* 3:34 PM */}
            </span>
            <div className="my-2 ml-auto">
              <PostOperations post={{ id, title: text }} />
            </div>
          </div>
          <p className="text-sm">
            {text} Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Quod aspernatur voluptatum quo rem itaque iusto nihil voluptas
            impedit ullam cum facilis commodi dolore perspiciatis debitis natus
            autem adipisci, error nemo.
          </p>
        </div>
      </div>
    </div>
  );
};

export const Comment: React.FC<CommentProps> = ({
  id,
  recipe_id,
  createdAt,
  text,
  user,
}) => {
  return (
    <>
      <article className="mb-6 rounded-lg bg-white p-6 text-base dark:border dark:border-slate-200 dark:bg-bgDark">
        <footer className="mb-2 flex items-center justify-between">
          <div className="flex items-center">
            <p className="mr-3 inline-flex items-center text-sm text-gray-900 dark:text-white">
              <UserAvatar
                user={{
                  name: user && user.name ? user.name : "Anonymous",
                  image:
                    user && user.image
                      ? user.image
                      : "https://flowbite.com/docs/images/people/profile-picture-2.jpg",
                }}
                className="mr-2 h-8 w-8 rounded-full"
              />
              {user && user.name ? user.name : "Anonymous"}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <time dateTime="2022-02-08" title="February 8th, 2022">
                {createdAt instanceof Date
                  ? createdAt.toLocaleDateString()
                  : new Date().toLocaleDateString()}
                {/* Feb. 8, 2022 */}
              </time>
            </p>
          </div>
          <PostOperations post={{ id: "aaaa", title: "aaaaa" }} />
        </footer>
        <p className="text-gray-500 dark:text-gray-400">
          {text}
          Very straight-to-point article. Really worth time reading. Thank you!
          But tools are just the instruments htmlFor the UX designers. The
          knowledge of the design tools are as important as the creation of the
          design strategy.
        </p>
        <div className="mt-4 flex items-center space-x-4">
          <button
            type="button"
            className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
          >
            <svg
              aria-hidden="true"
              className="mr-1 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              ></path>
            </svg>
            Reply
          </button>
        </div>
      </article>
    </>
  );
};
