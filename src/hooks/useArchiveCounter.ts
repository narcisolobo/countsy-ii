import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabase-client";

export function useArchiveCounter(counterId: string) {
  const queryClient = useQueryClient();

  const archive = useMutation({
    mutationFn: async (isArchived: boolean) => {
      const { error } = await supabase
        .from("counters")
        .update({ is_archived: isArchived })
        .eq("id", counterId);

      if (error) throw error;
    },
    onSuccess: (_, isArchived) => {
      toast.success(isArchived ? "Counter archived!" : "Counter unarchived!");
      queryClient.invalidateQueries({ queryKey: ["counters"] });
    },
    onError: () => {
      toast.error("Failed to update counter.");
    },
  });

  return archive;
}
