import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabase-client";
import type { NewCounter } from "@/types/counter";

function useCreateCounter(countersLength: number) {
  const queryClient = useQueryClient();

  const createCounter = useMutation({
    mutationFn: async () => {
      const newTitle = `Counter ${countersLength + 1}`;

      const { data, error } = await supabase
        .from("counters")
        .insert({ title: newTitle } satisfies NewCounter)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("Counter created!");
      queryClient.invalidateQueries({ queryKey: ["counters"] });
    },
    onError: () => {
      toast.error("Couldn't create counter");
    },
  });

  return createCounter;
}

export { useCreateCounter };
