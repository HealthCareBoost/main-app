"use client";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Form } from "@/components/ui/FormProvider";
import { useState } from "react";
import { Input } from "@/components/ui/FormInput";
import { Label } from "@/components/ui/Label";
import { useToast } from "@/hooks/use-toast";
import { useZodForm } from "@/hooks/useZodFormHook";
import { ChangeNameSchema } from "@/utils/validations/authSchema";
import type { z } from "zod";
import { api } from "@/utils/trpc/react";

interface EditUserProfileProps {
  user_id: string;
}

type FormData = z.infer<typeof ChangeNameSchema>;

const EditUserProfile = ({ user_id }: EditUserProfileProps) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const { toast } = useToast();
  const form = useZodForm({
    schema: ChangeNameSchema,
  });
  const changeName = api.user.changeName.useMutation();
  const utils = api.useUtils();

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"secondary"}
          className="mx-auto w-3/5 text-center hover:bg-slate-300 dark:hover:bg-slate-800"
        >
          Edit Profile Name
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form
          onSubmit={async (data: FormData) => {
            // console.log(data);
            const { success, error } = await changeName.mutateAsync({
              name: data.name,
            });
            await utils.user.getUserProfile.invalidate({ user_id });

            if (!success || error) {
              setDialogOpen(false);
              return toast({
                title: "Something went wrong.",
                description:
                  "Your name change request failed. Please try again.",
                variant: "destructive",
              });
            }

            if (success) {
              setDialogOpen(false);
              return toast({
                title: "Success!",
                description: "Your name was changed.",
              });
            }
          }}
          form={form}
        >
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <div className="col-span-3">
                <Input
                  label="Name"
                  type="text"
                  placeholder="John Smith"
                  hiddenLabel={true}
                  required
                  {...form.register("name")}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            {/* <DialogPrimitive.Close asChild> */}
            <Button
              variant={"outline"}
              className="text-center hover:bg-orange-400"
              type="submit"
            >
              Save changes
            </Button>
            {/* </DialogPrimitive.Close> */}
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserProfile;
