import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Archive, ArrowBigLeftDash, Loader2, Save } from "lucide-react";
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
  } = useForm<CounterFormValues>({
    resolver: zodResolver(counterSchema),
    defaultValues: {
      title: "",
      goal: undefined,
      value: undefined,
    },
    // Synced from the loaded counter; unlike reset-in-an-effect this also
    // fills the form when the data is already cached on first render.
    values: counter
      ? {
          title: counter.title ?? "",
          goal: counter.goal ?? undefined,
          value: counter.value ?? 0,
        }
      : undefined,
  });

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
    <section
      id="edit-form"
      className="mx-auto min-h-[70vh] max-w-5xl px-4 py-6"
    >
      <h1 className="font-label mb-6 text-3xl font-bold tracking-wider uppercase">
        Edit counter
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-surface border-line flex max-w-xl flex-col gap-4 rounded-sm border p-4 sm:p-6"
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
          placeholder="Enter goal"
          name="goal"
          label="goal (optional)"
          register={register}
          error={errors.goal}
          required={false}
          valueAsNumber
        />
        <div className="mt-4 flex flex-wrap gap-3">
          <Link to="/counters" className="ui-btn">
            <ArrowBigLeftDash /> Back
          </Link>
          <button
            className="ui-btn"
            type="button"
            disabled={!!counter.is_archived}
            onClick={showArchiveModal}
          >
            <Archive /> Archive
          </button>
          <button
            className="ui-btn ui-btn-primary"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : <Save />}{" "}
            Save
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
