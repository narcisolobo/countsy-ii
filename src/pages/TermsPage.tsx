import { Link } from "react-router";

function TermsPage() {
  return (
    <section id="terms" className="bg-base-200 min-h-[70vh]">
      <div className="container mx-auto">
        <div className="px-4 py-12">
          <h1 className="mb-4 text-3xl font-bold">Terms of Service</h1>
          <p className="text-base-content/70 mb-8 text-sm">
            Effective Date: April 29, 2025
          </p>
          <p className="mb-4">
            Welcome to <strong>Countsy</strong> — a tool that helps you count
            anything and track everything. By using our service, you agree to
            the following terms.
          </p>
          <h2 className="mt-6 mb-2 text-xl font-semibold">
            1. Acceptance of Terms
          </h2>
          <p className="mb-4">
            By accessing or using Countsy, you agree to be bound by these Terms
            of Service. If you do not agree, do not use the app.
          </p>
          <h2 className="mt-6 mb-2 text-xl font-semibold">
            2. Description of Service
          </h2>
          <p className="mb-4">
            Countsy provides users with a simple web-based counter management
            system. Features may include user authentication, counter creation,
            editing, and archiving.
          </p>
          <h2 className="mt-6 mb-2 text-xl font-semibold">3. User Accounts</h2>
          <ul className="mb-4 list-inside list-disc">
            <li>
              You are responsible for maintaining the confidentiality of your
              login credentials.
            </li>
            <li>
              You agree not to use the service for any illegal or unauthorized
              purpose.
            </li>
          </ul>
          <h2 className="mt-6 mb-2 text-xl font-semibold">
            4. Use of the Service
          </h2>
          <ul className="mb-4 list-inside list-disc">
            <li>
              You agree not to misuse the service or interfere with its normal
              operation.
            </li>
            <li>
              We may suspend or terminate your access if you violate these
              terms.
            </li>
          </ul>
          <h2 className="mt-6 mb-2 text-xl font-semibold">
            5. Intellectual Property
          </h2>
          <p className="mb-4">
            All branding, logos, and content are the property of Countsy or its
            licensors and may not be used without permission.
          </p>
          <h2 className="mt-6 mb-2 text-xl font-semibold">6. Privacy</h2>
          <p className="mb-4">
            We respect your privacy. Please see our{" "}
            <Link to="/privacy" className="link">
              Privacy Policy
            </Link>{" "}
            for information on how we handle your data.
          </p>
          <h2 className="mt-6 mb-2 text-xl font-semibold">
            7. Disclaimers and Limitation of Liability
          </h2>
          <ul className="mb-4 list-inside list-disc">
            <li>The service is provided "as is" with no warranties.</li>
            <li>
              We are not liable for any damages resulting from your use of the
              service.
            </li>
          </ul>
          <h2 className="mt-6 mb-2 text-xl font-semibold">
            8. Changes to the Terms
          </h2>
          <p className="mb-4">
            We may update these Terms occasionally. Changes will be posted on
            this page with an updated effective date.
          </p>
          <h2 className="mt-6 mb-2 text-xl font-semibold">9. Contact</h2>
          <p className="mb-4">
            For any questions, please contact:{" "}
            <a href="mailto:support@cisocodes.com" className="link">
              support@cisocodes.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default TermsPage;
