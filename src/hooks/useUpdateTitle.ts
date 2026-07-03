import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type Dispatch, type SetStateAction } from "react";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabase-client";
import type { Counter } from "@/types/counter";

export function useUpdateTitle(
  counter: Counter,
  handleSetDraftTitle: Dispatch<SetStateAction<string>>,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newTitle: string) => {
      const { error } = await supabase
        .from("counters")
        .update({ title: newTitle })
        .eq("id", counter.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["counters"] });
    },
    onError: () => {
      toast.error("Failed to update title");
      handleSetDraftTitle(counter.title);
    },
  });
}
