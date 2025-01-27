'use client';
import { Progress } from '@nextui-org/react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

interface IMultiStepProps {
  steps: {
    title: string;
    description: string;
    illustrationPath: string;
    hideStepIndicator?: boolean;
    isLoading?: boolean;
  }[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

interface IStepProps {
  step: number;
  stepOrder: number;
  maxStep: number;
  hideNext?: boolean;
}

const MultiStep = ({ steps, currentStep }: IMultiStepProps) => {
  return (
    <div className="w-full flex flex-col md:flex-row gap-8 items-center justify-between pt-6">
      <div className="flex-1 flex items-center justify-center gap-8">
        <div className="flex flex-col items-center gap-4">
          {steps.map((s, index) => {
            if (s.hideStepIndicator) return null;
            return (
              <Step
                key={index + 1}
                step={currentStep}
                stepOrder={index + 1}
                maxStep={steps.length}
                hideNext={steps[index + 1]?.hideStepIndicator}
              />
            );
          })}
        </div>
        <div className="flex flex-col items-start justify- self-start gap-2 md:pr-12 mt-36">
          <div className="min-h-12 flex items">
            <h2 className="text-xl font-bold text-primary">{`Step ${currentStep}`}</h2>
          </div>
          <h3 className="text-2xl font-bold inline-flex gap-6 items-center">{steps[currentStep - 1].title}</h3>
          <p className="text-gray-700 mt-2">{steps[currentStep - 1].description}</p>
          {steps[currentStep - 1].isLoading && <Progress className="mt-6" isIndeterminate size="sm" />}
        </div>
      </div>
      <div className="flex-1 flex justify-center">
        <img className="max-w-[70%]" src={steps[currentStep - 1].illustrationPath} alt="Step illustration thumbnail" />
      </div>
    </div>
  );
};

const Step = ({ step, stepOrder, maxStep, hideNext }: IStepProps) => {
  const isActive = step === stepOrder;
  const isComplete = step > stepOrder;
  const showLine = stepOrder < maxStep && !hideNext;

  return (
    <div className="flex items-start gap-4">
      <motion.button
        initial={false}
        animate={isActive ? 'active' : isComplete ? 'complete' : 'inactive'}
        variants={{
          inactive: { backgroundColor: '#fff' },
          active: { color: '#fff', backgroundColor: '#ff6591' },
          complete: { backgroundColor: '#ff6591' },
        }}
        transition={{ duration: 0.5 }}
        className={twMerge(
          'relative w-12 h-12 rounded-full border fill-white  grid place-items-center',
          isActive ? 'text-primary font-bold border-primary' : 'text-gray-500 font-normal'
        )}
      >
        {isComplete ? <CheckIcon /> : <span>{stepOrder}</span>}
        {showLine && (
          <motion.div className="h-full w-1 bg-gray-300 rounded-full absolute top-full mt-2">
            <motion.div
              className="w-full bg-primary-400 rounded-full"
              initial={{ height: 0 }}
              animate={{ height: isComplete ? '100%' : '0%' }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        )}
      </motion.button>
      <span className="min-h-24"></span>
    </div>
  );
};

const CheckIcon = () => {
  return (
    <svg
      className={'text-white h-6 w-6'}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 96 960 960"
      stroke="currentColor"
      strokeWidth={80}
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          delay: 0.3,
          type: 'tween',
          ease: 'easeOut',
          duration: 0.3,
        }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M382 816 154 588l57-57 171 171 367-367 57 57-424 424Z"
      />
    </svg>
  );
};

export default MultiStep;
