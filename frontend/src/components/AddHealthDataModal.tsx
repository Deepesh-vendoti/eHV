import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface HealthDataForm {
  weight: string;
  height: string;
  bloodPressure: string;
  bloodSugar: string;
  notes: string;
}

const AddHealthDataModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<HealthDataForm>({
    weight: "",
    height: "",
    bloodPressure: "",
    bloodSugar: "",
    notes: ""
  });

  const [errors, setErrors] = useState<Partial<HealthDataForm>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<HealthDataForm> = {};
    
    if (!formData.weight) newErrors.weight = "Weight is required";
    if (!formData.height) newErrors.height = "Height is required";
    if (!formData.bloodPressure) newErrors.bloodPressure = "Blood Pressure is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof HealthDataForm]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      // TODO: Replace with actual API call
      console.log("Submitting Health Data:", formData);
      // Reset form after successful submission
      setFormData({
        weight: "",
        height: "",
        bloodPressure: "",
        bloodSugar: "",
        notes: ""
      });
    } catch (error) {
      console.error("Error submitting health data:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          ➕ Add Health Data
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Health Data</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Input placeholder="Blood Pressure (e.g. 120/80)" />
          </div>
          <div>
            <Input placeholder="Blood Sugar Level (mg/dL)" />
          </div>
          <div>
            <Input placeholder="Weight (kg)" />
          </div>
          <div>
            <Textarea placeholder="Additional Notes" />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddHealthDataModal; 