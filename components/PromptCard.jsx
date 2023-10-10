"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

const PromptCard = ({ prompt}) => {

  const router = useRouter();
  const [copied, setCopied] = useState("");
  const { data: session } = useSession();
  const pathName = usePathname();

  const handleCopy = () => {
    setCopied(prompt.prompt);
    navigator.clipboard.writeText([prompt.prompt]);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };

  const handleDelete =  () => {
    // we can also use browser API 'confirm' for confirming delete from the user.
    router.push(`/delete-prompt?id=${prompt._id}`);
  };
  const handleEdit =  () => {
    router.push(`/update-prompt?id=${prompt._id}`);

  };
  const handleTagClick =  (tag)=>{
    const queryTag = tag.split('#')[1];
    router.push(`/prompts?tag=${queryTag}`);
  }
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer tag">
          <Image
            src={prompt?.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              @{prompt?.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {prompt?.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_button" onClick={handleCopy}>
          <Image
            src={
              copied === prompt.prompt
                ? "assets/icons/tick.svg"
                : "assets/icons/copy.svg"
            }
            width={20}
            height={20}
            className="cursor-pointer"
            alt="copy"
          />
        </div>
      </div>
      <p className="m-3 font-satoshi text-sm">{prompt.prompt}</p>
      <span
        className="m-3 text-sm font-inter cursor-pointer blue_gradient hover:underline"
        onClick={()=>handleTagClick(prompt.tag)}
      >
        {prompt.tag}
      </span>

      {session?.user.id === prompt.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-5 ">
          <span
          className="edit_btn"
            onClick={handleEdit}
          >
            Edit
          </span>
          <span
            className="delete_btn"
            onClick={handleDelete}
          >
            Delete
          </span>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
