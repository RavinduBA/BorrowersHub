import React, { useState, useEffect } from "react";

import Layout from "./components/Layout";
import BorrowerPipeline from "./components/BorrowerPipeline";
import CenterPanel from "./components/CenterPanel";
import RightPanel from "./components/RightPanel";
import { BorrowerProvider } from "./context/BorrowerContext";

const App: React.FC = () => {
  return (
    <BorrowerProvider>
      <Layout>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1">
            <BorrowerPipeline />
          </div>
          <div className="col-span-1">
            <CenterPanel />
          </div>
          <div className="col-span-1">
            <RightPanel />
          </div>
        </div>
      </Layout>
    </BorrowerProvider>
  );
};

export default App;
