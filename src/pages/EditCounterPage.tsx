import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Archive, ArrowBigLeftDash, Loader2, Save } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router";
import ArchiveModal from "@/components/counters/ArchiveModal";
import FormInput from "@/components/counters/FormInput";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAuth } from "@/hooks/useAuth";
import counterSchema, { type CounterFormValues } from "@/lib/counter-schema";
import { supabase } from "@/lib/supabase-client";
import type { Counter } from "@/types/counter";

function EditCounterPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, isLoading: isAuthLoading } = useAuth();

  // Same key and query as CountersPage so the cache is shared.
  const { data: counters, isPending } = useQuery({
    queryKey: ["counters"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("counters")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) throw error;

      return data as Counter[];
    },
    enabled: !!user && !isAuthLoading,
  });

  const counter = counters?.find((c) => c.id === id);

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm<CounterFormValues>({
    resolver: zodResolver(counterSchema),
    defaultValues: {
      title: "",
      goal: undefined,
      value: undefined,
    },
  });

  useEffect(() => {
    if (counter) {
      reset({
        title: counter.title ?? "",
        goal: counter.goal ?? undefined,
        value: counter.value ?? undefined,
      });
    }
  }, [counter, reset]);

  const onSubmit = async (data: CounterFormValues) => {
    if (!id) return;

    const { error } = await supabase
      .from("counters")
      .update({
        title: data.title,
        goal: data.goal,
        value: data.value,
      })
      .eq("id", id);

    if (error) {
      console.error(error.message);
      toast.error("Something went wrong...");
      return;
    }

    await queryClient.invalidateQueries({ queryKey: ["counters"] });
    toast.success("Changes saved!");
    navigate("/counters");
  };

  const showArchiveModal = () => {
    const modal = document.getElementById(
      `archive-modal-${id}`,
    ) as HTMLDialogElement | null;
    modal?.showModal();
  };

  if (isPending) return <LoadingSpinner />;

  if (!counter) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p>Counter not found.</p>
      </div>
    );
  }

  return (
    <section id="edit-form" className="mx-auto min-h-[70vh] max-w-5xl p-4">
      <h1 className="mb-6 text-center text-3xl font-bold">Edit Counter</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-surface border-line mx-auto flex max-w-2xl flex-col gap-4 rounded-lg border p-6"
      >
        <FormInput
          type="text"
          placeholder="Enter title"
          name="title"
          label="title"
          register={register}
          error={errors.title}
        />
        <FormInput
          type="number"
          placeholder="Enter starting value"
          name="value"
          label="starting value"
          register={register}
          error={errors.value}
          valueAsNumber
        />
        <FormInput
          type="number"
          placeholder="Enter goal (optional)"
          name="goal"
          label="goal"
          register={register}
          error={errors.goal}
          valueAsNumber
        />
        <div className="mt-4 flex justify-end gap-2">
          <Link
            to="/counters"
            aria-label="Back"
            title="Back"
            className="ui-btn"
          >
            <ArrowBigLeftDash />
          </Link>
          <button
            className="ui-btn hover:text-danger"
            type="button"
            aria-label="Archive counter"
            title="Archive counter"
            disabled={!!counter.is_archived}
            onClick={showArchiveModal}
          >
            <Archive />
          </button>
          <button
            className="ui-btn ui-btn-primary"
            type="submit"
            aria-label="Save changes"
            title="Save changes"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : <Save />}
          </button>
        </div>
      </form>
      <ArchiveModal
        counter={counter}
        onArchived={() => navigate("/counters")}
      />
    </section>
  );
}

export default EditCounterPage;
