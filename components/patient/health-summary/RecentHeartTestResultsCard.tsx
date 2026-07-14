import { ChevronRight } from 'lucide-react';
import { HeartTestResult } from '@/types/patient';

interface RecentHeartTestResultsCardProps {
  results: HeartTestResult[];
}

export function RecentHeartTestResultsCard({ results }: RecentHeartTestResultsCardProps) {
  return (
    <div className="h-full rounded-xl border border-border bg-card p-5">
      <h3 className="mb-3 text-base font-semibold text-fg">Recent heart test results</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-xs text-muted-foreground">
              <th className="py-2 pr-4 font-medium">Test</th>
              <th className="py-2 pr-4 font-medium">Result</th>
              <th className="py-2 pr-4 font-medium">Reference range</th>
              <th className="py-2 pr-4 font-medium">Date</th>
              <th className="w-6 py-2 font-medium" />
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.id} className="border-t border-border">
                <td className="py-3 pr-4 font-medium text-fg">{result.test}</td>
                <td className={`py-3 pr-4 font-medium ${result.resultColor}`}>{result.result}</td>
                <td className="py-3 pr-4 text-muted-foreground">{result.referenceRange}</td>
                <td className="whitespace-nowrap py-3 pr-4 text-muted-foreground">{result.date}</td>
                <td className="py-3">
                  <button aria-label={`View ${result.test} details`}>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-violet-700 hover:underline">
        View all results
        <ChevronRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

export default RecentHeartTestResultsCard;