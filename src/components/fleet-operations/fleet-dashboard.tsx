"use client";

import React, { useState } from "react";
import FleetHeader from "./header";
import FleetFilters from "./filters";
import FleetTable from "./fleet-table";
import FleetCards from "./fleet-cards";
import { AddVehicleModal } from "./add-vehicle-modal";

const FleetOperationsDashboard = () => {
  const [viewType, setViewType] = useState<"list" | "card">("list");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddVehicle = (vehicle: { name: string; plate: string; location: string }) => {
    console.log("New Vehicle Data:", vehicle);
    // Here you would typically update state or call an API
    setIsModalOpen(false);
  };

  return (
    <div className="pt-2 px-8 pb-8 bg-background min-h-screen text-foreground animate-in fade-in duration-500">
      <FleetHeader onAddClick={() => setIsModalOpen(true)} />
      <FleetFilters viewType={viewType} onViewChange={setViewType} />

      <div className="mt-2">
        {viewType === "list" ? <FleetTable /> : <FleetCards />}
      </div>

      <AddVehicleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddVehicle}
      />
    </div>
  );
};

export default FleetOperationsDashboard;
