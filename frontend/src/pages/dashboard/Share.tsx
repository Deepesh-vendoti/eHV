import React from "react";
import { Card, CardContent } from "../../components/ui/card";

const Share: React.FC = () => {
  return (
    <Card className="p-6 text-center">
      <CardContent>
        <h2 className="text-xl font-semibold mb-2">🤝 Share Records</h2>
        <p className="text-gray-600">Coming soon – securely share your medical records with healthcare providers.</p>
      </CardContent>
    </Card>
  );
};

export default Share;