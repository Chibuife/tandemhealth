import TemplatesHeader from "@/components/doctor/templates/TemplatesHeader";
import TemplatesStats from "@/components/doctor/templates/TemplatesStats";
import TemplatesSidebar from "@/components/doctor/templates/TemplatesSidebar";
import TemplatesToolbar from "@/components/doctor/templates/TemplatesToolbar";
import TemplatesTable from "@/components/doctor/templates/TemplatesTable";

export default function TemplatesPage() {
  return (
    <div>
      <TemplatesHeader />

      <TemplatesStats />

      {/* Categories/tags sidebar + template list: stacks to 1 column, then sidebar + 3-col content on large screens */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <TemplatesSidebar />
        </div>
        <div className="lg:col-span-3">
          <TemplatesToolbar />
          <TemplatesTable />
        </div>
      </div>
    </div>
  );
}