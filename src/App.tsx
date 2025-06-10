import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { ProjectManagement } from './pages/ProjectManagement';
import { ExperimentExecution } from './pages/ExperimentExecution';
import { TaskManagement } from './pages/TaskManagement';
import { FormulaManagement } from './pages/FormulaManagement';
import { ElectronicRecords } from './pages/ElectronicRecords';
import { RecordTemplates } from './pages/RecordTemplates';
import { MaterialManagement } from './pages/MaterialManagement';
import { SampleManagement } from './pages/SampleManagement';
import { ConsumableManagement } from './pages/ConsumableManagement';
import { ChromatographyColumnManagement } from './pages/ChromatographyColumnManagement';
import { ResinManagement } from './pages/ResinManagement';
import { EquipmentManagement } from './pages/EquipmentManagement';
import { EquipmentMaintenance } from './pages/EquipmentMaintenance';
import { EquipmentCalibration } from './pages/EquipmentCalibration';
import { EquipmentScheduling } from './pages/EquipmentScheduling';
import { EquipmentData } from './pages/EquipmentData';
import { WeighingStation } from './pages/WeighingStation';
import { CellLineManagement } from './pages/CellLineManagement';
import { DataAnalysis } from './pages/DataAnalysis';
import { AnalyticalModule } from './pages/AnalyticalModule';
import { DeviationManagement } from './pages/DeviationManagement';
import { AuditLogs } from './pages/AuditLogs';
import { ApprovalManagement } from './pages/ApprovalManagement';
import { ElectronicSignatures } from './pages/ElectronicSignatures';
import { UserManagement } from './pages/UserManagement';
import { Login } from './pages/Login';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="projects" element={<ProjectManagement />} />
            <Route path="experiment-execution" element={<ExperimentExecution />} />
            <Route path="task-management" element={<TaskManagement />} />
            <Route path="formula-management" element={<FormulaManagement />} />
            <Route path="records" element={<ElectronicRecords />} />
            <Route path="record-templates" element={<RecordTemplates />} />
            <Route path="materials" element={<MaterialManagement />} />
            <Route path="samples" element={<SampleManagement />} />
            <Route path="consumables" element={<ConsumableManagement />} />
            
            <Route path="chromatography-columns" element={<ChromatographyColumnManagement />} />
            <Route path="resin-management" element={<ResinManagement />} />
            <Route path="equipment" element={<EquipmentManagement />} />
            <Route path="equipment-maintenance" element={<EquipmentMaintenance />} />
            <Route path="equipment-calibration" element={<EquipmentCalibration />} />
            <Route path="equipment-scheduling" element={<EquipmentScheduling />} />
            <Route path="equipment-data" element={<EquipmentData />} />
            <Route path="weighing" element={<WeighingStation />} />
            <Route path="cell-bank" element={<CellLineManagement />} />
            <Route path="deviation-management" element={<DeviationManagement />} />
            <Route path="statistics" element={<DataAnalysis />} />
            <Route path="analytical-module" element={<AnalyticalModule />} />
            <Route path="audit-logs" element={<AuditLogs />} />
            <Route path="approval-management" element={<ApprovalManagement />} />
            <Route path="electronic-signatures" element={<ElectronicSignatures />} />
            <Route path="users" element={<UserManagement />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;