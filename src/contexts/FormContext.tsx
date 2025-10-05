import { createContext, useContext, ReactNode, useState } from 'react';

interface FormData {
  name: string;
  phone: string;
  country: string;
  company?: string;
  email?: string;
  jobTitle?: string;
  website?: string;
  customField?: string;
  address?: string;
  notes?: string;
}

interface FormContextType {
  formData: FormData;
  setFormData: (data: FormData) => void;
  isSubmissionFormActive: boolean;
  setSubmissionFormActive: (isActive: boolean) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    country: '',
  });
  const [isSubmissionFormActive, setSubmissionFormActive] = useState(false);

  return (
    <FormContext.Provider value={{ formData, setFormData, isSubmissionFormActive, setSubmissionFormActive }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
