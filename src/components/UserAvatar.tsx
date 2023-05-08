import type { User } from "@prisma/client";
import type { AvatarProps } from "@radix-ui/react-avatar";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { User as UserIcon } from "lucide-react";
import Image from "next/image";

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "image" | "name">;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user.image ? (
        <AvatarImage alt="Picture" src={user.image} />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user.name}</span>
          {/* <UserIcon className="h-6 w-6" /> */}
          {/* <AvatarImage alt="Picture" src={"/default_user.png"} /> */}
          <Image
            alt="Picture"
            className="h-10 w-10"
            src={"/default_user.png"}
            width={48}
            height={48}
          />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
