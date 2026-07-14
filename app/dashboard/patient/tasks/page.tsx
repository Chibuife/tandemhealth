import { TasksHeader } from '@/components/patient/tasks/TasksHeader';
import { TaskListCard } from '@/components/patient/tasks/TaskListCard';
import { TaskSummaryCard } from '@/components/patient/tasks/TaskSummaryCard';
import { UpcomingTasksCard } from '@/components/patient/tasks/UpcomingTasksCard';
import { MyRemindersCard } from '@/components/patient/tasks/MyRemindersCard';
import { NeedHelpCard } from '@/components/patient/tasks/NeedHelpCard';

export default function TasksPage() {
  return (
    <div>
      <TasksHeader />

      {/* Task list takes 3/4 on large screens, summary/upcoming/reminders sidebar takes 1/4 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <TaskListCard />
        </div>

        <div className="flex flex-col gap-4 lg:col-span-1">
          <TaskSummaryCard />
          <UpcomingTasksCard />
          <MyRemindersCard />
          <NeedHelpCard />
        </div>
      </div>
    </div>
  );
}