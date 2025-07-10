import { FormProvider } from '@/contexts/FormContext';
import { FormComponent } from '@/components/FormComponent';

const Index = () => {
  return (
    <FormProvider>
      <div className="min-h-screen bg-background">
        <FormComponent />
      </div>
    </FormProvider>
  );
};

export default Index;
