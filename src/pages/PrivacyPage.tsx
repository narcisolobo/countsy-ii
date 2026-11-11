function PrivacyPage() {
  return (
    <div className="bg-page min-h-[70vh]">
      <div className="mx-auto max-w-2xl">
        <div className="px-4 py-12">
          <h1 className="font-label mb-4 text-3xl font-bold tracking-wider uppercase">
            Privacy Policy
          </h1>
          <p className="text-ink-muted mb-4">
            At <strong>Countsy</strong>, we value your privacy. This Privacy
            Policy explains how we collect, use, and safeguard your information
            when you use our services.
          </p>
          <h2 className="ui-label mt-8 mb-2 text-xl">What We Collect</h2>
          <p className="text-ink-muted mb-4">
            We store only the data necessary to provide our service. This
            includes:
          </p>
          <ul className="text-ink-muted ml-8 list-disc">
            <li>Your authentication credentials (via Supabase)</li>
            <li>Your saved counters and related metadata</li>
          </ul>
          <h2 className="ui-label mt-8 mb-2 text-xl">How Your Data Is Used</h2>
          <p className="text-ink-muted mb-4">
            Your data is used solely to deliver the features of the app, such as
            creating, editing, and viewing your counters. We do not sell, rent,
            or share your data with third parties.
          </p>
          <h2 className="ui-label mt-8 mb-2 text-xl">Third-Party Services</h2>
          <p className="text-ink-muted mb-4">
            We use{" "}
            <a href="https://supabase.com" className="ui-link">
              <strong>Supabase</strong>
            </a>{" "}
            to provide authentication and database services. Supabase adheres to
            its own privacy and security policies, which we encourage you to
            review.
          </p>
          <h2 className="ui-label mt-8 mb-2 text-xl">Your Rights</h2>
          <p className="text-ink-muted mb-4">
            You may request deletion of your account and associated data at any
            time. Please contact the developer to initiate this request.
          </p>
          <p className="text-ink-muted mb-4">
            This Privacy Policy is subject to change. We will update this page
            to reflect any updates.
          </p>
          <p className="text-ink-muted mb-4">
            <em>Last updated: April 29, 2025</em>
          </p>
        </div>
      </div>
    </div>
  );
}
export default PrivacyPage;
