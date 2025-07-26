import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import treatmentCosts from "../data/treatment_costs.json";

// Extract unique values from JSON data
const getUniqueFacilities = () => [...new Set(treatmentCosts.map(item => item.Facility))];
const getUniqueCategories = () => [...new Set(treatmentCosts.map(item => item.Category))];

// Modal component for detailed service information
const ServiceModal = ({ service, isOpen, onClose, onSelect }: { service: any; isOpen: boolean; onClose: () => void; onSelect: () => void }) => {
  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Service Details</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-4">
            {/* Service Header */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{service.Service}</h3>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Facility:</span> {service.Facility}
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Category:</span> {service.Category}
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-3 text-gray-800">Cost Breakdown</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Base Cost:</span>
                  <span className="font-medium">KSh {service["Base Cost (KES)"].toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Insurance Copay:</span>
                  <span className="font-medium">KSh {service["Insurance Copay (KES)"].toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Out-of-Pocket:</span>
                  <span className="font-medium">KSh {service["Out-of-Pocket (KES)"].toLocaleString()}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">NHIF Coverage:</span>
                    <span className={`font-medium ${service["NHIF Covered"] === "Yes" ? "text-green-600" : "text-red-600"}`}>
                      {service["NHIF Covered"]}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-3 text-gray-800">Additional Information</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Service Type:</span> {service.Category}
                </div>
                <div>
                  <span className="font-medium">Facility Region:</span> {service.Region || "N/A"}
                </div>
                <div>
                  <span className="font-medium">Insurance Status:</span> 
                  <span className={`ml-1 ${service["NHIF Covered"] === "Yes" ? "text-green-600" : "text-orange-600"}`}>
                    {service["NHIF Covered"] === "Yes" ? "Covered by NHIF" : "Not covered by NHIF"}
                  </span>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-blue-800">Recommendations</h4>
              <div className="text-sm text-blue-700 space-y-1">
                {service["NHIF Covered"] === "Yes" ? (
                  <div>✓ This service is covered by NHIF - you may be eligible for reduced costs</div>
                ) : (
                  <div>⚠ This service is not covered by NHIF - consider private insurance options</div>
                )}
                <div>✓ Contact the facility directly for appointment scheduling</div>
                <div>✓ Bring your ID and insurance card (if applicable) to your appointment</div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button 
              onClick={onClose}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white"
            >
              Close
            </Button>
            <Button 
              onClick={onSelect}
              className="flex-1 bg-pink-500 hover:bg-pink-600 text-white"
            >
              Select This Service
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CostEstimator = () => {
  const [form, setForm] = useState({
    facility: "",
    service: "",
    category: "",
    insurance: "NHIF",
  });
  
  const [cost, setCost] = useState({
    procedure: 0,
    lab: 0,
    followup: 0,
    total: 0,
    insurance: 0,
    patient: 0,
  });

  const [filteredServices, setFilteredServices] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [modalService, setModalService] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const facilities = getUniqueFacilities();
  const categories = getUniqueCategories();
  const insuranceTypes = ["NHIF", "Private Insurance", "None"];

  // Filter services based on selected facility and category
  useEffect(() => {
    let filtered = treatmentCosts;
    
    if (form.facility) {
      filtered = filtered.filter(item => item.Facility === form.facility);
    }
    
    if (form.category) {
      filtered = filtered.filter(item => item.Category === form.category);
    }
    
    setFilteredServices(filtered);
  }, [form.facility, form.category]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSelectedService(null);
  };

  const handleServiceSelect = (service: any) => {
    setSelectedService(service);
    calculateCost(service);
  };

  const handleServiceClick = (service: any) => {
    setModalService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalService(null);
  };

  const selectServiceFromModal = () => {
    if (modalService) {
      handleServiceSelect(modalService);
      closeModal();
    }
  };

  const calculateCost = (service: any) => {
    const baseCost = service["Base Cost (KES)"];
    const insuranceCoverage = service["NHIF Covered"] === "Yes" ? service["Insurance Copay (KES)"] : 0;
    const outOfPocket = service["Out-of-Pocket (KES)"];
    
    // Estimate follow-up cost (20% of base cost)
    const followupCost = baseCost * 0.2;
    
    setCost({
      procedure: baseCost,
      lab: baseCost * 0.3, // Estimate 30% for lab costs
      followup: followupCost,
      total: baseCost + followupCost,
      insurance: insuranceCoverage,
      patient: outOfPocket + followupCost,
    });
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedService) {
      calculateCost(selectedService);
    }
  };

  const downloadPDF = async () => {
    try {
      // Dynamic import of jsPDF to avoid SSR issues
      const jsPDF = (await import('jspdf')).default;
      
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(20);
      doc.text('Treatment Cost Estimate', 20, 20);
      
      // Add date
      doc.setFontSize(12);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 35);
      
      // Add service details
      if (selectedService) {
        doc.setFontSize(14);
        doc.text('Service Details:', 20, 50);
        doc.setFontSize(12);
        doc.text(`Service: ${selectedService.Service}`, 20, 60);
        doc.text(`Facility: ${selectedService.Facility}`, 20, 70);
        doc.text(`Category: ${selectedService.Category}`, 20, 80);
        doc.text(`NHIF Covered: ${selectedService["NHIF Covered"]}`, 20, 90);
      }
      
      // Add cost breakdown
      doc.setFontSize(14);
      doc.text('Cost Breakdown (KES):', 20, 110);
      doc.setFontSize(12);
      doc.text(`Base Cost: ${cost.procedure.toLocaleString()}`, 20, 120);
      doc.text(`Laboratory Tests: ${cost.lab.toLocaleString()}`, 20, 130);
      doc.text(`Follow-up Care: ${cost.followup.toLocaleString()}`, 20, 140);
      doc.text(`Total Cost: ${cost.total.toLocaleString()}`, 20, 150);
      doc.text(`Insurance Coverage: -${cost.insurance.toLocaleString()}`, 20, 160);
      doc.setFontSize(14);
      doc.text(`Patient Cost: ${cost.patient.toLocaleString()}`, 20, 170);
      
      // Add footer
      doc.setFontSize(10);
      doc.text('Generated by tumAIni - Cervical Cancer Screening Platform', 20, 280);
      
      // Download the PDF
      doc.save('cost-estimate.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-2">Treatment & Screening Cost Estimator</h1>
      <p className="text-gray-500 mb-6">Calculate estimated costs using real data from Kenyan healthcare facilities.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 w-full">
        {/* Cost Calculator */}
        <form className="bg-white rounded-lg border p-6 space-y-4 w-full card-animate" onSubmit={handleCalculate}>
          <h2 className="font-semibold text-lg mb-2 flex items-center">&#36; Cost Calculator</h2>
          <p className="text-gray-500 text-sm mb-4">Select facility and service to estimate real costs</p>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Facility</label>
              <select name="facility" value={form.facility} onChange={handleChange} className="w-full border rounded px-3 py-2 input-animate">
                <option value="">Select facility</option>
                {facilities.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Service Category</label>
              <select name="category" value={form.category} onChange={handleChange} className="w-full border rounded px-3 py-2 input-animate">
                <option value="">Select category</option>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Insurance Coverage</label>
              <select name="insurance" value={form.insurance} onChange={handleChange} className="w-full border rounded px-3 py-2 input-animate">
                {insuranceTypes.map((i) => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
          </div>

          {/* Available Services */}
          {filteredServices.length > 0 && (
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Available Services</label>
              <div className="max-h-40 overflow-y-auto border rounded p-2 space-y-1">
                {filteredServices.map((service, index) => (
                  <div 
                    key={index}
                    className={`p-2 rounded cursor-pointer hover:bg-gray-50 border ${
                      selectedService === service ? 'bg-blue-50 border-blue-200' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="font-medium text-sm">{service.Service}</div>
                        <div className="text-xs text-gray-500">
                          Base Cost: KSh {service["Base Cost (KES)"].toLocaleString()}
                          {service["NHIF Covered"] === "Yes" ? " (NHIF Covered)" : " (Not NHIF Covered)"}
                        </div>
                      </div>
                      <div className="flex gap-1 ml-2">
                        <button
                          type="button"
                          onClick={() => handleServiceSelect(service)}
                          className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Select
                        </button>
                        <button
                          type="button"
                          onClick={() => handleServiceClick(service)}
                          className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                          Info
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 text-white mt-4 btn-animate">
            Calculate Cost
          </Button>
        </form>

        {/* Cost Breakdown */}
        <div className="bg-white rounded-lg border p-6 flex flex-col w-full card-animate">
          <h2 className="font-semibold text-lg mb-2 flex items-center">&#36; Cost Breakdown</h2>
          <div className="text-sm mb-2">Estimated costs in Kenyan Shillings (KSh)</div>
          
          {selectedService && (
            <div className="mb-4 p-3 bg-blue-50 rounded">
              <div className="font-medium text-sm">{selectedService.Service}</div>
              <div className="text-xs text-gray-600">{selectedService.Facility}</div>
            </div>
          )}
          
          <div className="space-y-1 mb-2">
            <div className="flex justify-between">
              <span>Base Cost:</span> 
              <span>KSh {cost.procedure.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Laboratory Tests:</span> 
              <span>KSh {cost.lab.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Follow-up Care:</span> 
              <span>KSh {cost.followup.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-semibold border-t pt-2">
              <span>Total Cost:</span> 
              <span>KSh {cost.total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Insurance Coverage:</span> 
              <span className="text-green-600">-KSh {cost.insurance.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Patient Cost:</span> 
              <span className="text-blue-700">KSh {cost.patient.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="flex gap-2 mt-2">
            <input 
              className="border rounded px-2 py-1 flex-1 input-animate" 
              placeholder="Patient Cost" 
              readOnly 
              value={`KSh ${cost.patient.toLocaleString()}`} 
            />
            <Button variant="outline" className="btn-animate">Save Estimate</Button>
            <Button 
              variant="outline" 
              className="btn-animate"
              onClick={downloadPDF}
              disabled={!selectedService}
            >
              Download PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Cost Comparison */}
      <div className="bg-white rounded-lg border p-6 w-full card-animate">
        <h3 className="font-semibold text-md mb-2">Cost Comparison by Category</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.slice(0, 3).map((category) => {
            const categoryServices = treatmentCosts.filter(item => item.Category === category);
            const avgCost = categoryServices.reduce((sum, item) => sum + item["Base Cost (KES)"], 0) / categoryServices.length;
            const minCost = Math.min(...categoryServices.map(item => item["Base Cost (KES)"]));
            const maxCost = Math.max(...categoryServices.map(item => item["Base Cost (KES)"]));
            
            return (
              <div key={category} className="flex flex-col items-center border rounded p-4">
                <div className="font-semibold mb-1 text-blue-700">{category}</div>
                <div className="text-xl font-bold mb-1">
                  KSh {minCost.toLocaleString()} - {maxCost.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">
                  Avg: KSh {avgCost.toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Service Modal */}
      <ServiceModal 
        service={modalService} 
        isOpen={isModalOpen} 
        onClose={closeModal}
        onSelect={selectServiceFromModal}
      />
    </div>
  );
};

export default CostEstimator; 