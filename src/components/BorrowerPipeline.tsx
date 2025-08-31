
import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export interface Borrower {
  id: string;
  name: string;
  loan_type: string;
  amount: number;
  status: string;
}

interface BorrowerPipelineProps {
  borrowers: Record<string, Borrower[]>;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onBorrowerSelect: (borrower: Borrower) => void;
  selectedBorrowerId: string | null;
}

const tabs = [
  { label: "New", value: "new" },
  { label: "In Review", value: "in_review" },
  { label: "Approved", value: "approved" },
];

const BorrowerPipeline: React.FC<BorrowerPipelineProps> = ({
  borrowers,
  activeTab,
  onTabChange,
  onBorrowerSelect,
  selectedBorrowerId,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col h-full">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="mb-4">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="flex-1">
            <div className="flex-1 overflow-y-auto">
              {borrowers[tab.value]?.length ? (
                borrowers[tab.value].map((b) => (
                  <div
                    key={b.id}
                    className={`flex items-center justify-between p-3 mb-2 rounded cursor-pointer transition-colors ${
                      selectedBorrowerId === b.id
                        ? "bg-blue-50 border border-blue-200"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => onBorrowerSelect(b)}
                  >
                    <div>
                      <div className="font-semibold">{b.name}</div>
                      <div className="text-xs text-gray-500">{b.loan_type}</div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="font-bold text-right">
                        ${b.amount.toLocaleString()}
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded bg-gray-200 text-gray-700 mt-1">
                        {b.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-400 text-center py-8">No borrowers</div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      {/* Radio Section */}
      <div className="mt-4">
        <div className="text-xs font-bold text-gray-500 mb-2 tracking-widest">
          F-SANATISED ACTIVE
        </div>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="fsan"
              className="accent-blue-600"
              defaultChecked
            />
            <span className="text-sm">Yes</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="fsan" className="accent-blue-600" />
            <span className="text-sm">No</span>
          </label>
        </div>
      </div>
    </div>
  );

  };

export default BorrowerPipeline;