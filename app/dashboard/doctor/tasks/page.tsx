import TasksHeader from "@/components/doctor/tasks/TasksHeader";
import TasksTabs from "@/components/doctor/tasks/TasksTabs";
import TasksToolbar from "@/components/doctor/tasks/TasksToolbar";
import TasksTable from "@/components/doctor/tasks/TasksTable";
import TaskSummaryCard from "@/components/doctor/tasks/TaskSummaryCard";
import UpcomingTasksCard from "@/components/doctor/tasks/UpcomingTasksCard";
import MyRemindersCard from "@/components/doctor/tasks/MyRemindersCard";

export default function TasksPage() {
  return (
    <div>
      <TasksHeader />

      {/* Task list takes 3/4 on large screens, summary/upcoming/reminders sidebar takes 1/4 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <TasksTabs />
          <TasksToolbar />
          <TasksTable />
        </div>
        <div className="space-y-4 lg:col-span-1">
          <TaskSummaryCard />
          <UpcomingTasksCard />
          <MyRemindersCard />
        </div>
      </div>
    </div>
  );
}