import { communityFormSchema } from "@/features/communities/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export default function useCommunityCreateForm() {
  const form = useForm<z.infer<typeof communityFormSchema>>({
    mode: "onTouched",
    resolver: zodResolver(communityFormSchema),
    defaultValues: {
      name: "",
      description: ""
    }
  });
  const onSubmit = (values: z.infer<typeof communityFormSchema>) => {
    console.log(values);
  };
  return { form, onSubmit };
}
