import React, { useState } from "react";
<<<<<<< HEAD
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { useAuth } from "../context/AuthContext";
import { toast } from "./ui/use-toast";

interface HealthDataForm {
  bloodPressure: string;
  bloodSugar: string;
  weight: string;
  notes: string;
}

export function AddHealthDataModal() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<HealthDataForm>({
    bloodPressure: "",
    bloodSugar: "",
    weight: "",
    notes: ""
  });
  const [errors, setErrors] = useState<Partial<Record<keyof HealthDataForm, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
=======
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
>>>>>>> c5fbe063 (Version with Store functioning at FE and APIs as theye were already there)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof HealthDataForm]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

<<<<<<< HEAD
  const validateForm = () => {
    const newErrors: Partial<Record<keyof HealthDataForm, string>> = {};
    const hasAny = formData.bloodPressure || formData.bloodSugar || formData.weight;

    if (!hasAny) {
      newErrors.bloodPressure = "Enter at least one metric";
    }

    if (formData.bloodSugar && isNaN(Number(formData.bloodSugar))) {
      newErrors.bloodSugar = "Blood sugar must be a number";
    }

    if (formData.weight && isNaN(Number(formData.weight))) {
      newErrors.weight = "Weight must be a number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const patientId = user?.id || 1;
    setIsSubmitting(true);

    try {
      const payloads = [];

      if (formData.bloodPressure) {
        payloads.push({
          metric: "Blood Pressure",
          value: formData.bloodPressure,
          unit: "mmHg",
        });
      }
      if (formData.bloodSugar) {
        payloads.push({
          metric: "Blood Sugar",
          value: formData.bloodSugar,
          unit: "mg/dL",
        });
      }
      if (formData.weight) {
        payloads.push({
          metric: "Weight",
          value: formData.weight,
          unit: "kg",
        });
      }

      const submitPromises = payloads.map((entry) =>
        fetch("http://localhost:8080/api/healthdata/self", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('authToken')}`,
          },
          body: JSON.stringify({
            patientId,
            ...entry,
            notes: formData.notes,
          }),
        })
      );

      await Promise.all(submitPromises);

      toast({
        title: "Success",
        description: "Health data submitted successfully",
      });

      // Trigger a refresh of the recent activity list
      window.dispatchEvent(new CustomEvent('refreshActivity'));

      // Reset form after successful submission
      setFormData({
        bloodPressure: "",
        bloodSugar: "",
        weight: "",
        notes: ""
      });
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit health data",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
=======
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
>>>>>>> c5fbe063 (Version with Store functioning at FE and APIs as theye were already there)
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
<<<<<<< HEAD
      <Button 
        onClick={() => setIsOpen(true)} 
        className="w-full h-10 text-lg"
      >
        ➕ Add New Health Data
      </Button>
      <DialogContent className="fixed inset-0 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 w-full sm:max-w-md bg-background p-6 shadow-lg rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add Health Data</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Blood Pressure (mmHg)</Label>
            <Input
              name="bloodPressure"
              value={formData.bloodPressure}
              onChange={handleChange}
              placeholder="Blood Pressure (e.g. 120/80)"
              className={errors.bloodPressure ? "border-red-500" : ""}
            />
            {errors.bloodPressure && (
              <p className="text-sm text-red-500">{errors.bloodPressure}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Blood Sugar (mg/dL)</Label>
            <Input
              name="bloodSugar"
              value={formData.bloodSugar}
              onChange={handleChange}
              placeholder="Blood Sugar Level"
              type="number"
              className={errors.bloodSugar ? "border-red-500" : ""}
            />
            {errors.bloodSugar && (
              <p className="text-sm text-red-500">{errors.bloodSugar}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Weight (kg)</Label>
            <Input
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Weight"
              type="number"
              step="0.1"
              className={errors.weight ? "border-red-500" : ""}
            />
            {errors.weight && (
              <p className="text-sm text-red-500">{errors.weight}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Additional Notes</Label>
            <Textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any additional notes..."
              className="resize-none h-24"
            />
          </div>
          <div className="flex justify-end items-center gap-4 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddHealthDataModal;
=======
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
>>>>>>> c5fbe063 (Version with Store functioning at FE and APIs as theye were already there)
