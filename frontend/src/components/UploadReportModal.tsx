import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

interface ReportForm {
  title: string;
  date: string;
  notes: string;
  file: File | null;
}

const UploadReportModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<ReportForm>({
    title: "",
    date: "",
    notes: "",
    file: null
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      // Validate file type
      const validTypes = ["application/pdf", "image/jpeg", "image/png"];
      if (!validTypes.includes(file.type)) {
        setError("Only PDF, JPG, or PNG files allowed");
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Max file size is 5MB");
        return;
      }
    }
    setError("");
    setFormData(prev => ({ ...prev, file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.file) {
      setError("Please fill all required fields and choose a file.");
      return;
    }
    try {
      // TODO: Replace with actual API call
      console.log("Submitting Report:", formData);
      // Reset form after successful submission
      setFormData({
        title: "",
        date: "",
        notes: "",
        file: null
      });
      setError("");
    } catch (error) {
      console.error("Error uploading report:", error);
      setError("Failed to upload report. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          📄 Upload Report
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Medical Report</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="file">Select File</Label>
            <Input id="file" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Report description..." />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Upload</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadReportModal; 