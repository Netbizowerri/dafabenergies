import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AdminShell } from "./components/admin/AdminShell";
import { ProtectedAdminRoute } from "./components/admin/ProtectedAdminRoute";
import { Layout } from "./components/Layout";

const HomePage = lazy(() => import("./pages/HomePage").then((module) => ({ default: module.HomePage })));
const ShopPage = lazy(() => import("./pages/ShopPage").then((module) => ({ default: module.ShopPage })));
const AboutPage = lazy(() => import("./pages/AboutPage").then((module) => ({ default: module.AboutPage })));
const ContactPage = lazy(() => import("./pages/ContactPage").then((module) => ({ default: module.ContactPage })));
const BookingPage = lazy(() => import("./pages/BookingPage").then((module) => ({ default: module.BookingPage })));
const QuoteCartPage = lazy(() =>
  import("./pages/QuoteCartPage").then((module) => ({ default: module.QuoteCartPage })),
);
const ServiceDetailPage = lazy(() =>
  import("./pages/ServiceDetailPage").then((module) => ({ default: module.ServiceDetailPage })),
);
const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage").then((module) => ({ default: module.NotFoundPage })),
);
const LoginPage = lazy(() => import("./pages/LoginPage").then((module) => ({ default: module.LoginPage })));
const AdminDashboardPage = lazy(() =>
  import("./pages/AdminDashboardPage").then((module) => ({ default: module.AdminDashboardPage })),
);
const AdminInquiriesPage = lazy(() =>
  import("./pages/AdminInquiriesPage").then((module) => ({ default: module.AdminInquiriesPage })),
);
const AdminProjectsPage = lazy(() =>
  import("./pages/AdminProjectsPage").then((module) => ({ default: module.AdminProjectsPage })),
);
const AdminInsightsPage = lazy(() =>
  import("./pages/AdminInsightsPage").then((module) => ({ default: module.AdminInsightsPage })),
);

export default function App() {
  return (
    <Suspense fallback={<div className="px-4 py-16 text-center text-sm text-slate-500">Loading...</div>}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<ProtectedAdminRoute />}>
          <Route element={<AdminShell />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="inquiries" element={<AdminInquiriesPage />} />
            <Route path="projects" element={<AdminProjectsPage />} />
            <Route path="insights" element={<AdminInsightsPage />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Route>
        </Route>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/quote-cart" element={<QuoteCartPage />} />
          <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
