import React from "react";
import { Card, CardContent } from "../../components/ui/card";

const Organize: React.FC = () => {
  return (
    <Card className="p-6 text-center">
      <CardContent>
        <h2 className="text-xl font-semibold mb-2">📁 Organize Records</h2>
        <p className="text-gray-600">Coming soon – organize your medical records by type and date.</p>
      </CardContent>
    </Card>
  );
};

export default Organize;