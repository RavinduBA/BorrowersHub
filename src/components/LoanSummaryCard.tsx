import React from "react";
import { Card } from "@/components/ui/card";

const LoanSummaryCard: React.FC<{
  employment: string;
  existing_loan: number;
  credit_score: number;
  source_of_funds: string;
}> = ({ employment, existing_loan, credit_score, source_of_funds }) => (
  <Card className="p-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <div className="text-xs text-gray-500">Employment</div>
        <div className="font-medium">{employment}</div>
      </div>
      <div>
        <div className="text-xs text-gray-500">Existing Loan</div>
        <div className="font-medium">${existing_loan.toLocaleString()}</div>
      </div>
      <div>
        <div className="text-xs text-gray-500">Credit Score</div>
        <div className="font-medium">{credit_score}</div>
      </div>
      <div>
        <div className="text-xs text-gray-500">Source of Funds</div>
        <div className="font-medium">{source_of_funds}</div>
      </div>
    </div>
  </Card>
);

export default LoanSummaryCard;
