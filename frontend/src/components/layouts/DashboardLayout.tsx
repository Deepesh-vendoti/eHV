import React from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Card, CardContent } from "../../components/ui/card";

const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentTab = () => {
    const path = location.pathname.split("/")[2];
    return path || "store";
  };

  return (
    <div className="min-h-screen px-6 py-8 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Health Dashboard</h1>
      </div>

      <Tabs
        defaultValue={getCurrentTab()}
        value={getCurrentTab()}
        onValueChange={(val: string) => navigate(`/dashboard/${val}`)}
        className="mb-6"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="store">📦 Store</TabsTrigger>
          <TabsTrigger value="organize">🗂 Organize</TabsTrigger>
          <TabsTrigger value="analyze">📊 Analyze</TabsTrigger>
          <TabsTrigger value="share">🤝 Share</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card>
        <CardContent className="py-6">
          <Outlet />
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardLayout;