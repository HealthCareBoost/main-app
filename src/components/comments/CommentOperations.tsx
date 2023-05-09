"use client";
import { Loader2, MoreVertical, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/AlertDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/DropDown";
import { toast } from "../../hooks/use-toast";
import { api } from "../../utils/api";
import { Comment } from "@prisma/client";

// async function deleteComment(commentId: string) {
//   const response = await fetch(`/api/comments/${commentId}`, {
//     method: "DELETE",
//   });

//   if (!response?.ok) {
//     toast({
//       title: "Something went wrong.",
//       description: "Your comment was not deleted. Please try again.",
//       variant: "destructive",
//     });
//   }

//   return true;
// }

interface CommentOperationsProps {
  comment: Pick<Comment, "id">;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CommentOperations({
  comment,
  setIsEditing,
}: CommentOperationsProps) {
  const router = useRouter();
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false);

  const deleteMutation = api.user.deleteComment.useMutation();

  const deleteComment = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setIsDeleteLoading(true);

    const { success, error } = await deleteMutation.mutateAsync({
      comment_id: comment.id,
    });

    if (!success || error) {
      toast({
        title: "Something went wrong.",
        description: "Your comment was not deleted. Please try again.",
        variant: "destructive",
      });
    }
    setIsDeleteLoading(false);
    setShowDeleteAlert(false);
    router.refresh();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-slate-50">
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="flex w-full cursor-pointer items-center"
            onSelect={() => setIsEditing(true)}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex cursor-pointer items-center text-red-600 focus:bg-red-50"
            onSelect={() => setShowDeleteAlert(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this comment?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => void deleteComment(e)}
              className="bg-red-600 focus:ring-red-600"
            >
              {isDeleteLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Trash className="mr-2 h-4 w-4" />
              )}
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
