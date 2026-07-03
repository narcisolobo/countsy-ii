import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabase-client";
import { type Counter } from "@/types/counter";

type UpdateContext = { previous?: Counter[] };

export function useUpdateCounterValue(counterId: string) {
  const queryClient = useQueryClient();

  return useMutation<Counter, Error, number, UpdateContext>({
    mutationFn: async (newValue: number) => {
      const { data, error } = await supabase
        .from("counters")
        .update({ value: newValue })
        .eq("id", counterId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onMutate: async (newValue) => {
      await queryClient.cancelQueries({ queryKey: ["counters"] });

      const previous = queryClient.getQueryData<Counter[]>(["counters"]);

      queryClient.setQueryData<Counter[]>(["counters"], (old) =>
        old?.map((c) => (c.id === counterId ? { ...c, value: newValue } : c)),
      );

      return { previous };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["counters"] });
    },
    onError: (_error, _variables, context: UpdateContext | undefined) => {
      toast.error("Failed to update counter");
      queryClient.setQueryData(["counters"], context?.previous);
    },
  });
}
