'use client';
import { PROVISION_STEPS } from '@/constants/config';
import MultiStep from '@/components/MultiStep';
import { useState } from 'react';

import { getResources } from '@/service/cloud-resources';
import { useQuery } from 'react-query';

const ProvisioningSteps = () => {
  const [currentStep, setCurrentStep] = useState(1);

  useQuery({
    queryFn: getResources,
    queryKey: 'cloud-resources',
    onSuccess: (data) => {
      if (currentStep === 1) {
        setCurrentStep(3);
      } else if (currentStep === 3 && data.database) {
        setCurrentStep(4);
      } else if (currentStep === 4 && data.storage) {
        setCurrentStep(5);
      } else if (currentStep === 5 && data.api) {
        setCurrentStep(6);
      }
    },
    enabled: currentStep !== 6,
    refetchInterval: 5000,
  });

  return (
    <div className="flex flex-col-reverse justify-between md:flex-row px-8">
      <MultiStep steps={PROVISION_STEPS} currentStep={currentStep} setCurrentStep={setCurrentStep} />
    </div>
  );
};

export default ProvisioningSteps;
