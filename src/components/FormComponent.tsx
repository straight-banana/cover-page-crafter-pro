import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Upload, User, GraduationCap, Building, BookOpen } from 'lucide-react';
import { useForm } from '@/contexts/FormContext';

const ValidationIndicator: React.FC<{ filled: boolean; required?: boolean }> = ({ 
  filled, 
  required = true 
}) => (
  <div className={`w-2 h-2 rounded-full ml-2 ${
    filled ? 'bg-green-500' : required ? 'bg-red-500' : 'bg-blue-500'
  }`} />
);

const FormSection: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({
  title,
  icon,
  children
}) => (
  <Card className="mb-6">
    <CardHeader className="pb-3">
      <CardTitle className="flex items-center text-lg font-semibold">
        {icon}
        <span className="ml-2">{title}</span>
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      {children}
    </CardContent>
  </Card>
);

const FormField: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  type?: 'input' | 'textarea' | 'file';
}> = ({ label, value, onChange, required = true, placeholder, type = 'input' }) => (
  <div className="space-y-2">
    <div className="flex items-center">
      <Label className="text-sm font-medium">{label}</Label>
      <ValidationIndicator filled={!!value} required={required} />
    </div>
    {type === 'input' && (
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full"
      />
    )}
    {type === 'textarea' && (
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full"
        rows={3}
      />
    )}
    {type === 'file' && (
      <div className="flex items-center space-x-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter logo URL or upload file"
          className="flex-1"
        />
        <div className="flex items-center justify-center w-10 h-10 border-2 border-dashed border-muted-foreground rounded-md cursor-pointer hover:border-primary transition-colors">
          <Upload className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    )}
  </div>
);

const SelectField: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  required?: boolean;
}> = ({ label, value, onChange, options, placeholder, required = true }) => (
  <div className="space-y-2">
    <div className="flex items-center">
      <Label className="text-sm font-medium">{label}</Label>
      <ValidationIndicator filled={!!value} required={required} />
    </div>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

export const FormComponent: React.FC = () => {
  const { formData, updateField } = useForm();

  const departments = [
    'Computer Science & Engineering',
    'Electrical & Electronic Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Chemical Engineering',
    'Business Administration',
    'Economics',
    'Mathematics',
    'Physics',
    'Chemistry'
  ];

  const designations = [
    'Professor',
    'Associate Professor',
    'Assistant Professor',
    'Lecturer',
    'Senior Lecturer',
    'Instructor'
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground">Cover Page Generator</h1>
        <p className="text-muted-foreground mt-2">Fill in the details to create your professional cover page</p>
      </div>

      <FormSection title="Institution Information" icon={<Building className="w-5 h-5" />}>
        <FormField
          label="Institution Name"
          value={formData.institutionName}
          onChange={(value) => updateField('institutionName', value)}
          placeholder="Enter your institution name"
        />
        <FormField
          label="Institution Logo"
          value={formData.institutionLogo}
          onChange={(value) => updateField('institutionLogo', value)}
          type="file"
          required={false}
        />
      </FormSection>

      <FormSection title="Course Information" icon={<BookOpen className="w-5 h-5" />}>
        <SelectField
          label="Report Type"
          value={formData.reportType}
          onChange={(value) => updateField('reportType', value)}
          options={['Lab Report', 'Report', 'Assignment', 'Homework']}
          placeholder="Select report type"
        />
        <div className="grid grid-cols-[120px_1fr] gap-4 items-end">
          <SelectField
            label="Field Label"
            value={formData.courseFieldLabel}
            onChange={(value) => updateField('courseFieldLabel', value)}
            options={['Course Name', 'Subject']}
            placeholder="Label"
            required={false}
          />
          <FormField
            label={formData.courseFieldLabel}
            value={formData.courseFieldValue}
            onChange={(value) => updateField('courseFieldValue', value)}
            placeholder={`Enter ${formData.courseFieldLabel.toLowerCase()}`}
          />
        </div>
        <FormField
          label="Course Code"
          value={formData.courseCode}
          onChange={(value) => updateField('courseCode', value)}
          placeholder="e.g., CSE-201"
          required={false}
        />
      </FormSection>

      <FormSection title="Student Information" icon={<GraduationCap className="w-5 h-5" />}>
        <FormField
          label="Student Name"
          value={formData.studentName}
          onChange={(value) => updateField('studentName', value)}
          placeholder="Enter your full name"
        />
        <div className="grid grid-cols-[120px_1fr] gap-4 items-end">
          <SelectField
            label="ID Label"
            value={formData.studentIdLabel}
            onChange={(value) => updateField('studentIdLabel', value)}
            options={['Roll', 'ID', 'UID']}
            placeholder="Label"
            required={false}
          />
          <FormField
            label={formData.studentIdLabel}
            value={formData.studentId}
            onChange={(value) => updateField('studentId', value)}
            placeholder={`Enter your ${formData.studentIdLabel.toLowerCase()}`}
          />
        </div>
        <SelectField
          label="Department"
          value={formData.department}
          onChange={(value) => updateField('department', value)}
          options={departments}
          placeholder="Select your department"
          required={false}
        />
        <div className="grid grid-cols-[120px_1fr] gap-4 items-end">
          <SelectField
            label="Class Label"
            value={formData.batchLabel}
            onChange={(value) => updateField('batchLabel', value)}
            options={['Batch', 'Class', 'Year', 'Level-Term']}
            placeholder="Label"
            required={false}
          />
          <FormField
            label={formData.batchLabel}
            value={formData.batch}
            onChange={(value) => updateField('batch', value)}
            placeholder={`e.g., ${formData.batchLabel === 'Class' ? 'Class 9' : formData.batchLabel === 'Level-Term' ? '2-I' : 'Spring 2023'}`}
          />
        </div>
        <FormField
          label="Group"
          value={formData.group}
          onChange={(value) => updateField('group', value)}
          placeholder="Enter group number (optional)"
          required={false}
        />
      </FormSection>

      <FormSection title="Teacher Information" icon={<User className="w-5 h-5" />}>
        <FormField
          label="Teacher Name"
          value={formData.teacherName}
          onChange={(value) => updateField('teacherName', value)}
          placeholder="Enter teacher's full name"
        />
        <FormField
          label="Designation"
          value={formData.teacherDesignation}
          onChange={(value) => updateField('teacherDesignation', value)}
          placeholder="e.g., Professor, Assistant Professor"
          required={false}
        />
        <FormField
          label="Subject/Department"
          value={formData.teacherSubjectDept}
          onChange={(value) => updateField('teacherSubjectDept', value)}
          placeholder="e.g., Computer Science"
          required={false}
        />
      </FormSection>

      <FormSection title="Session Information" icon={<GraduationCap className="w-5 h-5" />}>
        <FormField
          label="Session/Semester"
          value={formData.sessionSemester}
          onChange={(value) => updateField('sessionSemester', value)}
          placeholder="e.g., Spring 2024"
          required={false}
        />
        <FormField
          label="Date"
          value={formData.date}
          onChange={(value) => updateField('date', value)}
          placeholder="e.g., March 15, 2024"
          required={false}
        />
      </FormSection>
    </div>
  );
};