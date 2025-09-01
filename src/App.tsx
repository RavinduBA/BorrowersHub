import Layout from "./components/Layout";
import BorrowerPipeline from "./components/BorrowerPipeline";
import BorrowerDetail from "./components/BorrowerDetail";
import RightPanel from "./components/RightPanel";
import { BorrowerProvider } from "./context/BorrowerContext";

console.log("app loaded");

const App: React.FC = () => {
  return (
    <BorrowerProvider>
      <Layout>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1">
            <BorrowerPipeline />
          </div>
          <div className="col-span-1">
            <BorrowerDetail />
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
