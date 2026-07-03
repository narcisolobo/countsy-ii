import { BarChart3, PlusCircle, ShieldCheck } from "lucide-react";

function Features() {
  return (
    <section id="features">
      <div className="mx-auto flex min-h-[70vh] max-w-5xl flex-col items-center justify-center p-8 text-center">
        <h2 className="font-display mb-8 text-3xl font-semibold">
          What Can You Count?
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Feature 1 */}
          <div className="card bg-base-100 shadow">
            <div className="card-body items-center text-center">
              <PlusCircle className="text-primary h-10 w-10" />
              <h4 className="card-title mt-2">Unlimited Counters</h4>
              <p>Create and name as many counters as you need — no limits.</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="card bg-base-100 shadow">
            <div className="card-body items-center text-center">
              <BarChart3 className="text-primary h-10 w-10" />
              <h4 className="card-title mt-2">Track Progress</h4>
              <p>See your counts grow over time for habits, goals, or data.</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="card bg-base-100 shadow">
            <div className="card-body items-center text-center">
              <ShieldCheck className="text-primary h-10 w-10" />
              <h4 className="card-title mt-2">Secure and Synced</h4>
              <p>
                Your counters are stored safely with Supabase authentication.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
