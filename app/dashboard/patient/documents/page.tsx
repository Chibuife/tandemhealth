import PatientDocumentsHeader from '@/components/patient/documents/PatientDocumentsHeader';
import PatientDocumentsTabs from '@/components/patient/documents/PatientDocumentsTabs';
import PatientDocumentsToolbar from '@/components/patient/documents/PatientDocumentsToolbar';
import PatientDocumentsTable from '@/components/patient/documents/PatientDocumentsTable';
import StorageUsageCard from '@/components/patient/documents/StorageUsageCard';
import FiltersPanel from '@/components/patient/documents/FiltersPanel';
import RecentUploadsCard from '@/components/patient/documents/RecentUploadsCard';

import { patientDocuments, patientRecentUploads, patientStorageUsage } from '@/data/patientDemoData';

export default function PatientDocumentsPage() {
  return (
    <div>
      <PatientDocumentsHeader />

      {/* Document table takes 3/4 on large screens, storage/filters/uploads sidebar takes 1/4 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <PatientDocumentsTabs />
          <PatientDocumentsToolbar />
          <PatientDocumentsTable documents={patientDocuments} />
        </div>
        <div className="space-y-4 lg:col-span-1">
          <StorageUsageCard usage={patientStorageUsage} />
          <FiltersPanel />
          <RecentUploadsCard uploads={patientRecentUploads} />
        </div>
      </div>
    </div>
  );
}