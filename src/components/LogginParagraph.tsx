import Link from "next/link";
import { styles } from "../styles/style";

export const LogginParagraph: React.FC<{ actionText: string }> = ({
  actionText,
}) => {
  return (
    <div
      className={`${styles.paragraph} my-2 list-none p-2 pl-0 font-normal text-primaryDark dark:text-white`}
    >
      {actionText} please{" "}
      <Link className="text-orange-400 underline" href={"/login"}>
        log into your account
      </Link>{" "}
      or{" "}
      <Link className="text-orange-400 underline" href={"/register"}>
        create a new account
      </Link>
      .
    </div>
  );
};
