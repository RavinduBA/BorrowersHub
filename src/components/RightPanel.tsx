import React, { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

const BROKER_ID = "1"; // static for mock

const RightPanel: React.FC = () => {
  const [broker, setBroker] = useState<any>(null);
  const [workflow, setWorkflow] = useState<string[]>([]);
  const [aiEnabled, setAiEnabled] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5174/api/broker/${BROKER_ID}`)
      .then((res) => res.json())
      .then(setBroker);
    fetch("http://localhost:5174/api/onboarding/workflow")
      .then((res) => res.json())
      .then((data) => setWorkflow(data.steps || []));
  }, []);

  return (
    
      <Card className="h-fit w-full ">
        <div className="text-2xl font-semibold tracking-tight ml-4">Broker Overview</div>
        {broker ? (
          <div className="">
            <div className="text-xl font-bold ml-4">{broker.name}</div>
            <div className="grid grid-cols-3 gap-4 my-4">
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold">{broker.deals}</div>
                <div className="text-xs text-gray-500">Deals</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold">{broker.approval_rate}</div>
                <div className="text-xs text-gray-500">Approval Rate</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold">
                  ${broker.pending.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">Pending</div>
              </div>
            </div>
            {/* Contact Buttons */}
            <div className="flex justify-center gap-2 mt-2">
              <Button variant="outline" size="sm" className=" cursor-pointer">
                Call
              </Button>
              <Button variant="outline" size="sm" className=" cursor-pointer">
                Email
              </Button>
              <Button variant="outline" size="sm" className=" cursor-pointer">
                Chat
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-gray-400 text-center">
            Loading broker info...
          </div>
        )}
     
      {/* Onboarding Workflow Card */}
     
        <div className="text-lg font-semibold ml-4">Onboarding Workflow</div>
        <ol className="list-decimal ml-4 space-y-1">
          {workflow.length ? (
            workflow.map((step, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="inline-block w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-center font-bold mr-2">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))
          ) : (
            <li className="text-gray-400">Loading steps...</li>
          )}
        </ol>
    
      {/* AI Assistant Toggle */}
    
        <span className="font-medium ml-4">E Ardsassist</span>
        <label className="inline-flex  items-center cursor-pointer ml-4">
          <input
            type="checkbox"
            checked={aiEnabled}
            onChange={() => setAiEnabled((v) => !v)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-blue-600 transition-all"></div>
          <span className="ml-2 text-sm text-gray-600">
            {aiEnabled ? "On" : "Off"}
          </span>
        </label>
      </Card>

  );
};

export default RightPanel;
