import React from 'react';

const ProgressBar = ({ currentStep, goToStep }) => {
  const STEPS = [
    { id: 1, label: 'Informations' },
    { id: 2, label: 'Véhicule' },
    { id: 3, label: 'Confirmation' }
  ];

  return (
    <div className="progress-bar">
      {STEPS.map((step) => (
        <div
          key={step.id}
          className={`progress-step ${currentStep >= step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}
          onClick={() => currentStep > step.id && goToStep(step.id)}
          aria-current={currentStep === step.id ? 'step' : undefined}
        >
          <div className="step-number">{step.id}</div>
          <div className="step-label">{step.label}</div>
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;