import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router';
import { LoginScreen } from './screens/LoginScreen';
import { DashboardPI } from './screens/DashboardPI';
import { DashboardReviewer } from './screens/DashboardReviewer';
import { DashboardAdmin } from './screens/DashboardAdmin';
import { ProtocolSubmission } from './screens/ProtocolSubmission';
import { LOISubmission } from './screens/LOISubmission';
import { LOIApprovalNotification } from './screens/LOIApprovalNotification';
import { ReviewerComments } from './screens/ReviewerComments';
import { WorkflowConfig } from './screens/WorkflowConfig';
import { AIPreReviewPackage } from './screens/AIPreReviewPackage';
import { ReviewStatusDashboard } from './screens/ReviewStatusDashboard';
import { ComplianceReport } from './screens/ComplianceReport';
import { AmendmentHistory } from './screens/AmendmentHistory';
import { SponsorPortal } from './screens/SponsorPortal';
import { SystemFlowReference } from './screens/SystemFlowReference';
import { AuthenticatedLayout } from './components/AuthenticatedLayout';
import { DemoControls } from './components/DemoControls';

type UserRole = 'PI' | 'Reviewer' | 'Admin' | 'Sponsor';

function AppContent() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('PI');
  const [userName] = useState('Dr. Jane Doe');

  useEffect(() => {
    localStorage.setItem('loiSubmitted', 'false');
    localStorage.setItem('protocolInitiated', 'false');
    localStorage.setItem('notificationDismissed', 'false');
  }, []);

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setIsLoggedIn(true);
  };

  const handleRoleChange = (role: UserRole) => {
    setUserRole(role);
    navigate('/');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <>
      <DemoControls currentRole={userRole} onRoleChange={handleRoleChange} />
      <Routes>
        <Route path="/" element={
          <AuthenticatedLayout userName={userName} userRole={userRole} activeItem="dashboard" onLogout={handleLogout}>
            {userRole === 'PI' && <DashboardPI />}
            {userRole === 'Reviewer' && <DashboardReviewer />}
            {userRole === 'Admin' && <DashboardAdmin />}
            {userRole === 'Sponsor' && <SponsorPortal />}
          </AuthenticatedLayout>
        } />
        <Route path="/submit-protocol" element={
          <AuthenticatedLayout userName={userName} userRole={userRole} activeItem="submit-protocol" onLogout={handleLogout}>
            <ProtocolSubmission />
          </AuthenticatedLayout>
        } />
        <Route path="/submit-loi" element={
          <AuthenticatedLayout userName={userName} userRole={userRole} activeItem="submit-protocol" onLogout={handleLogout}>
            <LOISubmission />
          </AuthenticatedLayout>
        } />
        <Route path="/loi-approval-notification" element={
          <AuthenticatedLayout userName={userName} userRole={userRole} activeItem="submit-protocol" onLogout={handleLogout}>
            <LOIApprovalNotification />
          </AuthenticatedLayout>
        } />
        <Route path="/my-reviews" element={
          <AuthenticatedLayout userName={userName} userRole={userRole} activeItem="my-reviews" onLogout={handleLogout}>
            <DashboardReviewer />
          </AuthenticatedLayout>
        } />
        <Route path="/review/:id/comments" element={
          <ReviewerComments />
        } />
        <Route path="/review/:id/ai-package" element={
          <AIPreReviewPackage />
        } />
        <Route path="/workflow-config" element={
          <AuthenticatedLayout userName={userName} userRole={userRole} activeItem="workflow-config" onLogout={handleLogout}>
            <WorkflowConfig />
          </AuthenticatedLayout>
        } />
        <Route path="/reports" element={
          <AuthenticatedLayout userName={userName} userRole={userRole} activeItem="reports" onLogout={handleLogout}>
            <ReviewStatusDashboard />
          </AuthenticatedLayout>
        } />
        <Route path="/reports/compliance/:id" element={
          <AuthenticatedLayout userName={userName} userRole={userRole} activeItem="reports" onLogout={handleLogout}>
            <ComplianceReport />
          </AuthenticatedLayout>
        } />
        <Route path="/reports/amendments/:id" element={
          <AuthenticatedLayout userName={userName} userRole={userRole} activeItem="reports" onLogout={handleLogout}>
            <AmendmentHistory />
          </AuthenticatedLayout>
        } />
        <Route path="/sponsor-review/:id" element={
          <AuthenticatedLayout userName={userName} userRole={userRole} activeItem="dashboard" onLogout={handleLogout}>
            <SponsorPortal />
          </AuthenticatedLayout>
        } />
        <Route path="/system-flow-reference" element={
          <AuthenticatedLayout userName={userName} userRole={userRole} activeItem="dashboard" onLogout={handleLogout}>
            <SystemFlowReference />
          </AuthenticatedLayout>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}