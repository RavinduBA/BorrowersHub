import React, { useState } from "react";

import Layout from "./components/Layout";
import BorrowerPipeline from "./components/BorrowerPipeline";
import type { Borrower } from "./components/BorrowerPipeline";

// Mock data (replace with API integration later)
const mockBorrowers = {
  new: [
    {
      id: "1",
      name: "Sarah Dunn",
      loan_type: "Home Loan",
      amount: 300000,
      status: "Renew",
    },
    {
      id: "3",
      name: "Lisa Carter",
      loan_type: "Home Loan",
      amount: 450000,
      status: "New",
    },
  ],
  in_review: [
    {
      id: "2",
      name: "Alan Matthews",
      loan_type: "Personal Loan",
      amount: 20000,
      status: "In Review",
    },
  ],
  approved: [],
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("new");
  const [selectedBorrower, setSelectedBorrower] = useState<Borrower | null>(
    mockBorrowers["new"][0] || null
  );

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Panel: Borrower Pipeline */}
        <div className="col-span-1">
          <BorrowerPipeline
            borrowers={mockBorrowers}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onBorrowerSelect={setSelectedBorrower}
            selectedBorrowerId={selectedBorrower?.id || null}
          />
        </div>
        {/* Center Panel: Borrower Detail (placeholder) */}
        <div className="col-span-1">
          <div className="bg-white rounded-lg shadow p-4 h-full flex items-center justify-center text-gray-400">
            Borrower Detail (to be implemented)
          </div>
        </div>
        {/* Right Panel: Broker Info (placeholder) */}
        <div className="col-span-1">
          <div className="bg-white rounded-lg shadow p-4 h-full flex items-center justify-center text-gray-400">
            Broker Info (to be implemented)
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default App;
