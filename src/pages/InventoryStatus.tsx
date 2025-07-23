import { Button } from "@/components/ui/button";

const stats = [
  { label: "Total Items", value: 125, description: "Across all categories" },
  { label: "Low Stock", value: 3, description: "Items need restocking" },
  { label: "Total Value", value: "KSh 245,000", description: "Current inventory value" },
  { label: "Last Updated", value: "Today", description: "Real-time tracking" },
];

const inventoryItems = [
  {
    name: "Pap Smear Kits",
    supplier: "MedSupply Kenya",
    lastRestocked: "2024-01-10",
    current: 45,
    min: 20,
    max: 100,
    price: 850,
    unit: "unit",
    status: "high",
  },
  {
    name: "HPV Test Kits",
    supplier: "BioLab Solutions",
    lastRestocked: "2024-01-05",
    current: 12,
    min: 15,
    max: 50,
    price: 2400,
    unit: "unit",
    status: "low",
  },
  {
    name: "Colposcopy Supplies",
    supplier: "MediEquip Ltd",
    lastRestocked: "2023-12-28",
    current: 8,
    min: 10,
    max: 30,
    price: 1200,
    unit: "unit",
    status: "low",
  },
  {
    name: "Biopsy Forceps",
    supplier: "Surgical Instruments Co",
    lastRestocked: "2024-01-08",
    current: 25,
    min: 10,
    max: 40,
    price: 3500,
    unit: "unit",
    status: "high",
  },
  {
    name: "Acetic Acid Solution",
    supplier: "ChemLab Kenya",
    lastRestocked: "2024-02-01",
    current: 35,
    min: 20,
    max: 90,
    price: 450,
    unit: "unit",
    status: "high",
  },
];

const restockAlerts = [
  { name: "HPV Test Kits", message: "below minimum threshold" },
  { name: "Colposcopy Supplies", message: "below minimum threshold" },
];

const quickActions = [
  { label: "Add New Item" },
  { label: "Update Stock Levels" },
  { label: "Generate Inventory Report" },
];

const InventoryStatus = () => {
  return (
    <div>
      <p className="text-gray-500 mb-6">Monitor availability of screening tools and supplies for cervical cancer prevention.</p>
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg border p-6 flex flex-col items-center">
            <div className="text-2xl font-bold text-pink-600 mb-1">{stat.value}</div>
            <div className="font-medium text-gray-700">{stat.label}</div>
            <div className="text-xs text-gray-400 mt-1">{stat.description}</div>
          </div>
        ))}
      </div>
      {/* Inventory Items */}
      <div className="bg-white rounded-lg border p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-semibold text-lg mb-1">Inventory Items</h2>
            <p className="text-gray-500 text-sm">Current stock levels and reorder information</p>
          </div>
          <Button className="bg-pink-500 hover:bg-pink-600 text-white">Request Restock</Button>
        </div>
        <div className="divide-y">
          {inventoryItems.map((item) => {
            const percent = Math.min(100, Math.round(((item.current - item.min) / (item.max - item.min)) * 100));
            const barColor = item.status === "low" ? "bg-red-500" : "bg-green-500";
            return (
              <div key={item.name} className="py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{item.name} {item.status === "low" && <span className="ml-2 px-2 py-0.5 rounded bg-red-100 text-red-700 text-xs font-semibold">Low Stock</span>}</div>
                  <div className="text-xs text-gray-500 mb-1">Supplier: {item.supplier} • Last restocked: {item.lastRestocked}</div>
                  <div className="text-xs text-gray-700 mb-1">Current: {item.current} {item.unit}</div>
                  <div className="w-full h-2 bg-gray-200 rounded mb-1">
                    <div className={`${barColor} h-2 rounded`} style={{ width: `${percent}%` }}></div>
                  </div>
                </div>
                <div className="flex flex-col items-end min-w-[180px]">
                  <div className="text-xs text-gray-500">High Stock</div>
                  <div className="text-sm font-semibold">KSh {item.price.toLocaleString()} per {item.unit}</div>
                  <div className="text-xs text-gray-400">Min: {item.min} • Max: {item.max}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Restock Alerts */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="font-semibold text-md mb-2">Restock Alerts</h3>
          <div className="space-y-2">
            {restockAlerts.map((alert) => (
              <div key={alert.name} className="flex items-center gap-2 text-sm bg-red-50 text-red-700 px-3 py-2 rounded">
                <span className="material-icons text-base">warning</span>
                <span className="font-medium">{alert.name}</span>
                <span className="text-xs">{alert.message}</span>
              </div>
            ))}
            {restockAlerts.length === 0 && <div className="text-xs text-gray-400">No items require immediate attention.</div>}
          </div>
        </div>
        {/* Quick Actions */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="font-semibold text-md mb-2">Quick Actions</h3>
          <div className="space-y-2">
            {quickActions.map((a) => (
              <Button key={a.label} variant="outline" className="w-full text-left">{a.label}</Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryStatus; 