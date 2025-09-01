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
    <div className="flex flex-col gap-6">
      {/* Broker Info Card */}
      <Card className="flex flex-col gap-4 p-6">
        <div className="text-lg font-bold mb-2">Broker Overview</div>
        {broker ? (
          <>
            <div className="text-xl font-semibold">{broker.name}</div>
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
              <Button variant="outline" size="sm">
                Call
              </Button>
              <Button variant="outline" size="sm">
                Email
              </Button>
              <Button variant="outline" size="sm">
                Chat
              </Button>
            </div>
          </>
        ) : (
          <div className="text-gray-400 text-center">
            Loading broker info...
          </div>
        )}
      </Card>
      {/* Onboarding Workflow Card */}
      <Card className="p-6">
        <div className="text-lg font-bold mb-4">Onboarding Workflow</div>
        <ol className="list-decimal ml-6 space-y-2">
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
      </Card>
      {/* AI Assistant Toggle */}
      <Card className="flex items-center justify-between p-4">
        <span className="font-medium">E Ardsassist</span>
        <label className="inline-flex items-center cursor-pointer">
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
    </div>
  );
};

export default RightPanel;
