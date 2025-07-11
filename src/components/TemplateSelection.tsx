import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Monitor, Smartphone, FileText, Palette, ChevronLeft, ChevronRight } from 'lucide-react';

interface OrientationOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

interface PaperSize {
  id: string;
  name: string;
  dimensions: string;
  description: string;
}

interface Template {
  id: string;
  name: string;
  preview: string;
  category: string;
}

interface Background {
  id: string;
  name: string;
  preview: string;
  type: 'solid' | 'gradient' | 'pattern';
}

const orientations: OrientationOption[] = [
  {
    id: 'portrait',
    name: 'Portrait',
    icon: <Smartphone className="w-8 h-8" />,
    description: 'Vertical orientation (taller than wide)'
  },
  {
    id: 'landscape',
    name: 'Landscape',
    icon: <Monitor className="w-8 h-8" />,
    description: 'Horizontal orientation (wider than tall)'
  }
];

const paperSizes: PaperSize[] = [
  { id: 'a4', name: 'A4', dimensions: '210 × 297 mm', description: 'Standard document size' },
  { id: 'letter', name: 'Letter', dimensions: '8.5 × 11 in', description: 'US standard size' },
  { id: 'legal', name: 'Legal', dimensions: '8.5 × 14 in', description: 'US legal size' },
  { id: 'a3', name: 'A3', dimensions: '297 × 420 mm', description: 'Large format' }
];

const templates: Template[] = [
  { id: 'classic', name: 'Classic', preview: '/api/placeholder/200/280', category: 'Academic' },
  { id: 'modern', name: 'Modern', preview: '/api/placeholder/200/280', category: 'Academic' },
  { id: 'minimal', name: 'Minimal', preview: '/api/placeholder/200/280', category: 'Academic' },
  { id: 'formal', name: 'Formal', preview: '/api/placeholder/200/280', category: 'Business' },
  { id: 'creative', name: 'Creative', preview: '/api/placeholder/200/280', category: 'Design' },
  { id: 'elegant', name: 'Elegant', preview: '/api/placeholder/200/280', category: 'Academic' }
];

const backgrounds: Background[] = [
  { id: 'white', name: 'Pure White', preview: '#ffffff', type: 'solid' },
  { id: 'light-gray', name: 'Light Gray', preview: '#f8f9fa', type: 'solid' },
  { id: 'cream', name: 'Cream', preview: '#fefcf3', type: 'solid' },
  { id: 'gradient-blue', name: 'Blue Gradient', preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', type: 'gradient' },
  { id: 'gradient-purple', name: 'Purple Gradient', preview: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', type: 'gradient' },
  { id: 'pattern-dots', name: 'Subtle Dots', preview: 'url(data:image/svg+xml,%3Csvg width="20" height="20" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="dots" patternUnits="userSpaceOnUse" width="20" height="20"%3E%3Ccircle cx="10" cy="10" r="1.5" fill="%23e2e8f0"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100%25" height="100%25" fill="white"/%3E%3Crect width="100%25" height="100%25" fill="url(%23dots)"/%3E%3C/svg%3E)', type: 'pattern' }
];

export const TemplateSelection: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'orientation' | 'paperSize' | 'template' | 'background'>('orientation');
  const [selections, setSelections] = useState({
    orientation: '',
    paperSize: '',
    template: '',
    background: ''
  });

  const updateSelection = (key: string, value: string) => {
    setSelections(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    const steps = ['orientation', 'paperSize', 'template', 'background'] as const;
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const prevStep = () => {
    const steps = ['orientation', 'paperSize', 'template', 'background'] as const;
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const renderOrientationStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Choose Orientation</h2>
        <p className="text-muted-foreground">Select how you want your cover page oriented</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {orientations.map((option) => (
          <Card 
            key={option.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selections.orientation === option.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => updateSelection('orientation', option.id)}
          >
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-4 text-primary">
                {option.icon}
              </div>
              <h3 className="font-semibold mb-2">{option.name}</h3>
              <p className="text-sm text-muted-foreground">{option.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderPaperSizeStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Select Paper Size</h2>
        <p className="text-muted-foreground">Choose the paper size for your cover page</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
        {paperSizes.map((size) => (
          <Card 
            key={size.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selections.paperSize === size.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => updateSelection('paperSize', size.id)}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">{size.name}</h3>
                <Badge variant="outline">{size.dimensions}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{size.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderTemplateStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Choose Template</h2>
        <p className="text-muted-foreground">Select a design template for your cover page</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {templates.map((template) => (
          <Card 
            key={template.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selections.template === template.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => updateSelection('template', template.id)}
          >
            <CardContent className="p-3">
              <div className="aspect-[3/4] bg-muted rounded-md mb-3 flex items-center justify-center">
                <FileText className="w-8 h-8 text-muted-foreground" />
              </div>
              <div className="text-center">
                <h3 className="font-medium mb-1">{template.name}</h3>
                <Badge variant="secondary" className="text-xs">{template.category}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderBackgroundStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Select Background</h2>
        <p className="text-muted-foreground">Choose a background style for your cover page</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {backgrounds.map((bg) => (
          <Card 
            key={bg.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selections.background === bg.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => updateSelection('background', bg.id)}
          >
            <CardContent className="p-3">
              <div 
                className="aspect-[3/4] rounded-md mb-3 border"
                style={{ 
                  background: bg.type === 'solid' ? bg.preview : 
                             bg.type === 'gradient' ? bg.preview :
                             bg.preview
                }}
              />
              <div className="text-center">
                <h3 className="font-medium mb-1">{bg.name}</h3>
                <Badge variant="secondary" className="text-xs capitalize">{bg.type}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const getCurrentStepComponent = () => {
    switch (currentStep) {
      case 'orientation': return renderOrientationStep();
      case 'paperSize': return renderPaperSizeStep();
      case 'template': return renderTemplateStep();
      case 'background': return renderBackgroundStep();
      default: return renderOrientationStep();
    }
  };

  const isStepComplete = () => {
    return selections[currentStep] !== '';
  };

  const isLastStep = currentStep === 'background';
  const isFirstStep = currentStep === 'orientation';

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Progress indicator */}
      <div className="flex items-center justify-center space-x-2">
        {['orientation', 'paperSize', 'template', 'background'].map((step, index) => (
          <div key={step} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep === step ? 'bg-primary text-primary-foreground' :
              selections[step as keyof typeof selections] ? 'bg-green-500 text-white' :
              'bg-muted text-muted-foreground'
            }`}>
              {index + 1}
            </div>
            {index < 3 && <div className="w-8 h-px bg-muted mx-2" />}
          </div>
        ))}
      </div>

      {/* Current step content */}
      {getCurrentStepComponent()}

      {/* Navigation buttons */}
      <div className="flex justify-between items-center max-w-4xl mx-auto">
        <Button 
          variant="outline" 
          onClick={prevStep}
          disabled={isFirstStep}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        <Button 
          onClick={isLastStep ? () => console.log('Generate cover page', selections) : nextStep}
          disabled={!isStepComplete()}
          className="flex items-center gap-2"
        >
          {isLastStep ? 'Generate Cover Page' : 'Next'}
          {!isLastStep && <ChevronRight className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  );
};