import React, { useEffect, useState } from "react";

import { Card } from "./ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";
import { Button } from "./ui/button";
import { AlertTriangle, ArrowBigDown, ArrowDown } from "lucide-react";
import { useBorrowerContext } from "../context/BorrowerContext";

interface BorrowerDetailData {
  id: string;
  name: string;
  email: string;
  phone: string;
  loan_amount: number;
  status: string;
  employment: string;
  income: number;
  existing_loan: number;
  credit_score: number;
  source_of_funds: string;
  risk_signal: string;
  ai_flags: string[];
}

const statusColors: Record<string, string> = {
  New: "bg-gray-200 text-gray-700",
  "In Review": "bg-gray-200 text-gray-700",
  Approved: "bg-gray-200 text-gray-700",
  Renew: "bg-gray-200 text-gray-700",
};

const BorrowerDetail: React.FC = () => {
  const { borrowers, selectedBorrowerId } = useBorrowerContext();
  const [detail, setDetail] = useState<BorrowerDetailData | null>(null);
  const [loading, setLoading] = useState(false);

  const selectedBorrower =
    Object.values(borrowers)
      .flat()
      .find((b) => b.id === selectedBorrowerId) || null;

  useEffect(() => {
    console.log(
      "[BorrowerDetail] selectedBorrowerId changed:",
      selectedBorrowerId
    );

    if (selectedBorrowerId) {
      setLoading(true);
      setDetail(null); // Clear previous detail immediately

      fetch(`http://localhost:5174/api/borrowers/${selectedBorrowerId}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          console.log(
            "[BorrowerDetail] Fetched detail for:",
            selectedBorrowerId,
            data
          );
          setDetail(data);
        })
        .catch((error) => {
          console.error(
            "[BorrowerDetail] Error fetching borrower details:",
            error
          );
          setDetail(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setDetail(null);
      setLoading(false);
    }
  }, [selectedBorrowerId]);

  if (!selectedBorrowerId || !selectedBorrower) {
    return (
      <Card className="h-full flex flex-col items-center justify-center text-gray-400">
        <div>No borrower selected</div>
        <div className="text-xs text-red-500 mt-2">
          (Click a borrower in the left panel to view details here)
        </div>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className="h-full flex flex-col items-center justify-center text-gray-400">
        <div>Loading borrower details for:</div>
        <div className="text-xs font-mono text-blue-600 mt-1">
          {selectedBorrower.name} (id: {selectedBorrower.id})
        </div>
      </Card>
    );
  }

  if (!detail) {
    return (
      <Card className="h-full flex flex-col items-center justify-center text-gray-400">
        <div>Failed to load borrower details</div>
        <div className="text-xs text-red-500 mt-2">
          Please try selecting the borrower again
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-fit flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-tight ml-4">
        Borrower Details
      </h1>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 border-b pb-4 ml-4 mr-4">
        <div>
          <div className="text-xl font-bold">{detail.name}</div>
          <div className="text-sm text-gray-500"> {detail.email} </div>
          <div className="text-sm text-gray-500"> {detail.phone} </div>
        </div>
        <div className="flex  flex-col ">
          <div className="text-lg font-semibold">
            {" "}
            ${detail.loan_amount.toLocaleString()}{" "}
          </div>
          <span
            className={
              "px-3 py-1 w-fit  rounded text-xs font-semibold " +
              (statusColors[detail.status] || "bg-gray-200 text-gray-700")
            }
          >
            {detail.status}
          </span>
        </div>
      </div>

      {/* AI Explainability Section */}

      <Accordion type="single" collapsible defaultValue="ai-explain">
        <AccordionItem value="ai-explain" >
          {/* Header with icon and title */}
          <AccordionTrigger className=" font-semibold ml-4 mr-4 text-sm sm:text-base cursor-pointer w-20">
                        AI Explainability Issues
          </AccordionTrigger>

          {/* Accordion content */}
          <AccordionContent className=" ml-2">
            <ul className="space-y-2 pl-2">
              {detail.ai_flags && detail.ai_flags.length > 0 ? (
                detail.ai_flags.map((flag, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-sm"
                  >
                    <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
                    {flag}
                  </li>
                ))
              ) : (
                <li className="text-gray-500 text-sm pl-1">
                  No AI flags detected
                </li>
              )}
            </ul>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <Button variant="outline" className="flex-1 sm:flex-none cursor-pointer">
                Request Documents
              </Button>
              <Button variant="secondary" className="flex-1 sm:flex-none cursor-pointer">
                Send to Valuer
              </Button>
              <Button variant="default" className="flex-1 sm:flex-none cursor-pointer">
                Approve
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Loan Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-4 " >
        <div>
          <div className="text-xs text-gray-500">Employment</div>
          <div className="font-medium">{detail.employment}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Existing Loan</div>
          <div className="font-medium">
            ${detail.existing_loan.toLocaleString()}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Credit Score</div>
          <div className="font-medium">{detail.credit_score}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Source of Funds</div>
          <div className="font-medium">{detail.source_of_funds}</div>
        </div>
      </div>

      {/* Risk Signal */}
      <div className="flex items-center gap-2 ml-4 mr-4 bg-yellow-50 text-yellow-800 rounded px-3 py-2">
        <AlertTriangle className="w-4 h-4 text-yellow-600" />
        <span className="font-medium">{detail.risk_signal}</span>
      </div>

      {/* Escalate Button */}
      <div className="flex justify-end">
        <Button variant="outline" className="mr-4 cursor-pointer">
          Escalate to Credit Committee
        </Button>
      </div>
    </Card>
  );
};

export default BorrowerDetail;
