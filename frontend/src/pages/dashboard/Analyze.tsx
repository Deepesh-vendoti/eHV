import React from "react";
import { Card, CardContent } from "../../components/ui/card";

const Analyze: React.FC = () => {
  return (
    <Card className="p-6 text-center">
      <CardContent>
        <h2 className="text-xl font-semibold mb-2">📊 Analyze Records</h2>
        <p className="text-gray-600">Coming soon – visualize and analyze your health data trends.</p>
      </CardContent>
    </Card>
  );
};

export default Analyze;