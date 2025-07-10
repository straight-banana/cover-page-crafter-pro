import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface FormData {
  // Institution Info
  institutionName: string;
  institutionLogo: string; // URL or base64

  // Course Info
  reportType: string; // Lab Report, Report, Assignment, Homework
  courseFieldLabel: string; // Course Name or Subject
  courseFieldValue: string;
  courseCode: string; // optional

  // Student Info
  studentName: string;
  studentIdLabel: string; // Roll, ID, UID
  studentId: string;
  department: string; // optional
  batchLabel: string; // Batch, Class, Year, Level-Term
  batch: string;
  group: string; // optional

  // Teacher Info
  teacherName: string;
  teacherDesignation: string; // optional
  teacherSubjectDeptLabel: string; // Subject or Department
  teacherSubjectDept: string; // Subject or Department

  // Session/Semester and Date
  sessionSemesterLabel: string; // Session or Semester
  sessionSemester: string; // optional
  date: string; // optional
}

interface FormContextType {
  formData: FormData;
  updateField: (field: keyof FormData, value: string) => void;
  resetForm: () => void;
}

const initialFormData: FormData = {
  institutionName: '',
  institutionLogo: '',
  reportType: 'Lab Report',
  courseFieldLabel: 'Course Name',
  courseFieldValue: '',
  courseCode: '',
  studentName: '',
  studentIdLabel: 'ID',
  studentId: '',
  department: '',
  batchLabel: 'Batch',
  batch: '',
  group: '',
  teacherName: '',
  teacherDesignation: '',
  teacherSubjectDeptLabel: 'Subject',
  teacherSubjectDept: '',
  sessionSemesterLabel: 'Session',
  sessionSemester: '',
  date: '',
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