"use client";

import { useState } from "react";

interface TravelIntake {
  tripDuration?: number;
  experience?: string[];
}

const EXPERIENCE_OPTIONS = [
  "Beaches",
  "Nightlife",
  "Adventure",
  "Cafés",
  "Heritage",
  "Relaxation",
];

export default function OnboardingForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<TravelIntake>({});

  const steps = [
    {
      title: "How many days is your trip?",
      component: (
        <>
          <input
            type="number"
            min={1}
            max={14}
            value={formData.tripDuration ?? ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                tripDuration: Number(e.target.value),
              })
            }
            className="w-full p-3 rounded-lg bg-neutral-800 border border-neutral-700"
          />
        </>
      ),
      isValid: () => !!formData.tripDuration,
    },
    {
      title: "Select up to 3 experiences you want in Goa",
      component: (
        <div className="grid grid-cols-2 gap-3">
          {EXPERIENCE_OPTIONS.map((item) => {
            const selected = formData.experience?.includes(item);

            const toggle = () => {
              const current = formData.experience || [];

              if (current.includes(item)) {
                setFormData({
                  ...formData,
                  experience: current.filter((e) => e !== item),
                });
              } else if (current.length < 3) {
                setFormData({
                  ...formData,
                  experience: [...current, item],
                });
              }
            };

            return (
              <button
                key={item}
                onClick={toggle}
                className={`p-3 rounded-lg border transition ${
                  selected
                    ? "bg-white text-black"
                    : "bg-neutral-800 border-neutral-700"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      ),
      isValid: () =>
        !!formData.experience && formData.experience.length > 0,
    },
    {
      title: "Preview Your Travel Preferences",
      component: (
        <pre className="bg-neutral-800 p-4 rounded-lg text-sm overflow-auto">
          {JSON.stringify(formData, null, 2)}
        </pre>
      ),
      isValid: () => true,
    },
  ];

  const nextStep = () => {
    if (!steps[currentStep].isValid()) return;
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const step = steps[currentStep];

  return (
    <div className="w-full max-w-xl p-8 bg-neutral-900 rounded-2xl shadow-xl">
      <h1 className="text-2xl font-semibold mb-6">
        Plan Your Goa Experience
      </h1>

      <p className="mb-4">{step.title}</p>

      {step.component}

      <div className="flex gap-3 mt-6">
        {currentStep > 0 && (
          <button
            onClick={prevStep}
            className="w-1/2 bg-neutral-700 py-3 rounded-lg"
          >
            Back
          </button>
        )}

        {currentStep < steps.length - 1 && (
          <button
            onClick={nextStep}
            disabled={!step.isValid()}
            className="w-1/2 bg-white text-black py-3 rounded-lg font-medium disabled:opacity-50"
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
}