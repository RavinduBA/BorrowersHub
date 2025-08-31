import React, { createContext, useContext, useState, useEffect } from "react";
import type { Borrower } from "@/components/BorrowerPipeline";

interface BorrowerContextType {
  borrowers: Record<string, Borrower[]>;
  selectedBorrower: Borrower | null;
  setSelectedBorrower: (b: Borrower | null) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  fetchBorrowers: () => void;
}

const BorrowerContext = createContext<BorrowerContextType | undefined>(
  undefined
);

export const BorrowerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [borrowers, setBorrowers] = useState<Record<string, Borrower[]>>({
    new: [],
    in_review: [],
    approved: [],
  });
  const [selectedBorrower, setSelectedBorrower] = useState<Borrower | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<string>("new");

  const fetchBorrowers = () => {
    fetch("http://localhost:5174/api/borrowers/pipeline")
      .then((res) => res.json())
      .then((data) => {
        setBorrowers({
          new: data.new || [],
          in_review: data.in_review || [],
          approved: data.approved || [],
        });
        const first =
          data.new?.[0] || data.in_review?.[0] || data.approved?.[0] || null;
        setSelectedBorrower(first || null);
      });
  };

  useEffect(() => {
    fetchBorrowers();
  }, []);

  return (
    <BorrowerContext.Provider
      value={{
        borrowers,
        selectedBorrower,
        setSelectedBorrower,
        activeTab,
        setActiveTab,
        fetchBorrowers,
      }}
    >
      {children}
    </BorrowerContext.Provider>
  );
};

export const useBorrowerContext = () => {
  const ctx = useContext(BorrowerContext);
  if (!ctx)
    throw new Error("useBorrowerContext must be used within BorrowerProvider");
  return ctx;
};
