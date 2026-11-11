import { Navigate, Route, Routes, useNavigate } from "react-router";
import Drawer from "@/components/Drawer";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProtectedRoute from "@/guards/ProtectedRoute";
import PublicOnlyRoute from "@/guards/PublicOnlyRoute";
import { useAuth } from "@/hooks/useAuth";
import { handleSignOut } from "@/lib/auth";
import AuthCallbackPage from "@/pages/AuthCallbackPage";
import CountersPage from "@/pages/CountersPage";
import EditCounterPage from "@/pages/EditCounterPage";
import PrivacyPage from "@/pages/PrivacyPage";
import SignInPage from "@/pages/SignInPage";
import TermsPage from "@/pages/TermsPage";
import { type DrawerItem } from "@/types/drawer-item";

function App() {
  const { isLoading, isSignedIn } = useAuth();
  const navigate = useNavigate();

  const drawerItemsSignedIn: DrawerItem[] = [
    { label: "Counters", href: "/counters" },
    { label: "Sign out", onClick: () => handleSignOut(navigate) },
  ];

  const drawerItemsSignedOut: DrawerItem[] = [
    { label: "Sign in", href: "/sign-in" },
  ];

  if (isLoading) return null;

  return (
    <Drawer items={isSignedIn ? drawerItemsSignedIn : drawerItemsSignedOut}>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/sign-in" replace />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
          <Route
            path="/sign-in"
            element={
              <PublicOnlyRoute>
                <SignInPage />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/counters"
            element={
              <ProtectedRoute>
                <CountersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/counters/:id/edit"
            element={
              <ProtectedRoute>
                <EditCounterPage />
              </ProtectedRoute>
            }
          />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Routes>
      </main>
      <Footer />
    </Drawer>
  );
}

export default App;
