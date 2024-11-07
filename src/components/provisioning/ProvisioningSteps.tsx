'use client';
import { PROVISION_STEPS } from '@/constants/config';
import MultiStep from '@/components/MultiStep';
import { useState } from 'react';

const ProvisioningSteps = () => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="flex flex-col-reverse justify-between md:flex-row px-8">
      <MultiStep steps={PROVISION_STEPS} currentStep={currentStep} setCurrentStep={setCurrentStep} />
    </div>
  );
};

export default ProvisioningSteps;
