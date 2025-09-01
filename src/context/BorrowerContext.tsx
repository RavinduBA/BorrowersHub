import React, { createContext, useContext, useState, useEffect } from "react";
import type { Borrower } from "@/components/BorrowerPipeline";

interface BorrowerContextType {
  borrowers: Record<string, Borrower[]>;
  selectedBorrowerId: string | null;
  setSelectedBorrowerId: (id: string | null) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  fetchBorrowers: () => void;
}

// Create the context with an undefined default value
const BorrowerContext = createContext<BorrowerContextType | undefined>(  undefined);

export const BorrowerProvider: React.FC<{ children: React.ReactNode }> = ({children,}) => {

  // State to hold borrowers grouped by status, selected borrower ID, and active tab
  const [borrowers, setBorrowers] = useState<Record<string, Borrower[]>>({  new: [],in_review: [], approved: [], });
  const [selectedBorrowerId, setSelectedBorrowerId] = useState<string | null>(null );
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
        // Only set selectedBorrowerId if none is already selected
        const first =  data.new?.[0] || data.in_review?.[0] || data.approved?.[0] || null;
        setSelectedBorrowerId((prev) => prev || (first ? first.id : null));
      });
  };

  useEffect(() => {
    fetchBorrowers();
  }, []);

  return (
    <BorrowerContext.Provider  value={{  borrowers, selectedBorrowerId, setSelectedBorrowerId,activeTab,setActiveTab,fetchBorrowers,}} >
      {children}
    </BorrowerContext.Provider>
  );
};

{ /* A custom hook for consuming the context. */ }
export const useBorrowerContext = () => {
  const ctx = useContext(BorrowerContext);
  if (!ctx)
    throw new Error("useBorrowerContext must be used within BorrowerProvider");
  return ctx;
};
