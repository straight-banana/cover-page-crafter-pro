import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface FormData {
  // Institution Info
  institutionName: string;
  institutionLogo: string; // URL or base64

  // Course Info
  courseName: string;
  courseCode: string;

  // Student Info
  studentName: string;
  studentId: string;
  department: string;
  batch: string;
  group: string; // optional

  // Teacher Info
  teacherName: string;
  teacherDesignation: string;

  // Session/Semester
  sessionSemester: string;
}

interface FormContextType {
  formData: FormData;
  updateField: (field: keyof FormData, value: string) => void;
  resetForm: () => void;
}

const initialFormData: FormData = {
  institutionName: '',
  institutionLogo: '',
  courseName: '',
  courseCode: '',
  studentName: '',
  studentId: '',
  department: '',
  batch: '',
  group: '',
  teacherName: '',
  teacherDesignation: '',
  sessionSemester: '',
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  return (
    <FormContext.Provider value={{ formData, updateField, resetForm }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};