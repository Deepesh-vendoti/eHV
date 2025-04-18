import React, { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useAuth } from "../context/AuthContext";
import { uploadHealthRecord } from "../api/healthRecords";
import { toast } from "./ui/use-toast";

interface UploadForm {
  recordType: string;
  description: string;
  file: File | null;
}

const ALLOWED_FILE_TYPES = {
  'application/pdf': 'PDF',
  'image/jpeg': 'JPEG',
  'image/png': 'PNG',
  'image/heic': 'HEIC',
  'application/dicom': 'DICOM',
} as const;

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const RECORD_TYPES = [
  { value: "LAB_REPORT", label: "Lab Report" },
  { value: "PRESCRIPTION", label: "Prescription" },
  { value: "SCAN", label: "Scan/X-Ray" },
  { value: "VACCINATION", label: "Vaccination Record" },
  { value: "OTHER", label: "Other" },
] as const;

const UploadReportModal = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<UploadForm>({
    recordType: "",
    description: "",
    file: null,
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateFile = (file: File): string | null => {
    if (!file) {
      return "Please select a file.";
    }

    // Check file type
    if (!Object.keys(ALLOWED_FILE_TYPES).includes(file.type)) {
      return `Invalid file type. Allowed types: ${Object.values(ALLOWED_FILE_TYPES).join(', ')}`;
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return `File too large. Maximum size: ${formatFileSize(MAX_FILE_SIZE)}`;
    }

    return null;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        e.target.value = ''; // Reset file input
        return;
      }
      setFormData(prev => ({ ...prev, file }));
      setError(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null); // Clear error when user makes changes
  };

  const handleRecordTypeChange = (value: string) => {
    setFormData(prev => ({ ...prev, recordType: value }));
    setError(null); // Clear error when record type is selected
  };

  const validateForm = (): boolean => {
    if (!formData.file) {
      setError("Please select a file.");
      return false;
    }
    if (!formData.recordType) {
      setError("Please select a record type.");
      return false;
    }
    
    // Clear error if both file and record type are valid
    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append("file", formData.file!);
      uploadFormData.append("patientId", String(user?.id || 1));
      uploadFormData.append("recordType", formData.recordType);
      if (formData.description) {
        uploadFormData.append("description", formData.description);
      }

      const response = await uploadHealthRecord(uploadFormData);

      if (!response || !response.recordType) {
        throw new Error("Invalid response from server");
      }

      toast({
        title: "Success",
        description: "Medical record uploaded successfully",
      });

      // Reset form
      setFormData({
        recordType: "",
        description: "",
        file: null,
      });
      setError(null);

      // Trigger a refresh of the recent activity list
      window.dispatchEvent(new CustomEvent('refreshActivity'));
      
      setIsOpen(false);
    } catch (error) {
      console.error("Error uploading report:", error);
      toast({
        title: "Error",
        description: "Failed to upload report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button 
        onClick={() => setIsOpen(true)} 
        variant="outline" 
        className="w-full h-10 text-lg"
      >
        📄 Upload Medical Document
      </Button>
      <DialogContent className="fixed inset-0 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 w-full sm:max-w-md bg-background p-6 shadow-lg rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Upload Medical Report</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file">Select File</Label>
            <Input
              id="file"
              type="file"
              accept={Object.keys(ALLOWED_FILE_TYPES).join(',')}
              onChange={handleFileChange}
              className={error && !formData.file ? "border-red-500" : ""}
            />
            <p className="text-xs text-muted-foreground">
              Supported formats: {Object.values(ALLOWED_FILE_TYPES).join(', ')} (max {formatFileSize(MAX_FILE_SIZE)})
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="recordType">Record Type</Label>
            <Select value={formData.recordType} onValueChange={handleRecordTypeChange}>
              <SelectTrigger className={error && !formData.recordType ? "border-red-500" : ""}>
                <SelectValue placeholder="Select record type" />
              </SelectTrigger>
              <SelectContent>
                {RECORD_TYPES.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add any relevant notes about this record..."
              className="resize-none h-24"
            />
          </div>
          {error && (
            <p className="text-sm text-red-500 font-medium">{error}</p>
          )}
          <div className="flex justify-end items-center gap-4 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/90"
            >
              {isSubmitting ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadReportModal;
