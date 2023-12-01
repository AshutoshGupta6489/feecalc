import React, { useState } from 'react';

type FeeOption = {
  tree: any;
  value: string;
};

const FeeCalculator: React.FC = () => {
  const feeStructure: any = {
    'Exam Fee': {
      INDIAN: {
        'ALL_COURSES': {
          'ALL_LEVEL': {
            amount: 400,
          },
        },
      },
      FOREIGN: {
        'ALL_COURSES': {
          'ALL_LEVEL': {
            amount: 100,
          },
        },
      },
      NRI: {
        'ALL_COURSES': {
          'ALL_LEVEL': {
            amount: 600,
          },
        },
      },
      SAARC: {
        'ALL_COURSES': {
          'ALL_LEVEL': {
            amount: 600,
          },
        },
      },
    },
    'Application Fee': {
      INDIAN: {
        'ALL_COURSES': {
          UG: {
            amount: 200,
          },
          'UG-DIPLOMA': {
            amount: 300,
          },
          PG: {
            amount: 500,
          },
        },
      },
      FOREIGN: {
        'ALL_COURSES': {
          UG: {
            amount: 400,
          },
          'UG-DIPLOMA': {
            amount: 400,
          },
          PG: {
            amount: 700,
          },
        },
      },
    },
  };

  const [selectedNationality, setSelectedNationality] = useState<FeeOption | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<FeeOption | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<FeeOption | null>(null);
  const [amount, setAmount] = useState<any | null>(null);

  // Function to reset selected options based on the specified level
  function resetLevel(whichLevel:number) {
    if (whichLevel === 0) {
      setSelectedNationality(null);
      setSelectedCourse(null);
      setSelectedLevel(null);
      setAmount(null);
    } else if (whichLevel === 1) {
      setSelectedCourse(null);
      setSelectedLevel(null);
      setAmount(null);
    } else if (whichLevel === 2) {
      setSelectedLevel(null);
      setAmount(null);
    } else if (whichLevel === 3) {
      setAmount(null);
    }
  }

  return (
    <div>
      <h1>Fee Calculator</h1>
      <div>
        <label>Select Fee:</label>
        <select
          value={selectedNationality ? selectedNationality.value : ''}
          onChange={(e) => {
            resetLevel(0);
            if (e.target.value) {
              setSelectedNationality({
                tree: feeStructure[e.target.value],
                value: e.target.value,
              });
            }
          }}
        >
          <option value="">Select</option>
          {Object.keys(feeStructure).map((fee) => (
            <option key={fee} value={fee}>
              {fee}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Select Nationality:</label>
        <select
          value={selectedCourse ? selectedCourse.value : ''}
          onChange={(e) => {
            resetLevel(1);
            if (e.target.value) {
              setSelectedCourse({
                tree: selectedNationality?.tree[e.target.value] || {},
                value: e.target.value,
              });
            }
          }}
          disabled={!selectedNationality}
        >
          <option value="">Select</option>
          {selectedNationality &&
            Object.keys(selectedNationality.tree).map((fee) => (
              <option key={fee} value={fee}>
                {fee}
              </option>
            ))}
        </select>
      </div>

      <div>
        <label>Select course:</label>
        <select
          value={selectedLevel ? selectedLevel.value : ''}
          onChange={(e) => {
            resetLevel(2);
            if (e.target.value) {
              setSelectedLevel({
                tree: selectedCourse?.tree[e.target.value] || {},
                value: e.target.value,
              });
            }
          }}
          disabled={!selectedNationality || !selectedCourse}
        >
          <option value="">Select</option>
          {selectedCourse &&
            Object.keys(selectedCourse.tree)[0] !== 'ALL_COURSES'
              ? Object.keys(selectedCourse.tree).map((fee) => (
                  <option key={fee} value={fee}>
                    {fee}
                  </option>
                ))
              : ['Medical', 'Dental', 'Ayurveda'].map((fee) => (
                  <option key={fee} value={'ALL_COURSES'}>
                    {fee}
                  </option>
                ))}
        </select>
      </div>

      <div>
        <label>Select level:</label>
        <select
          value={amount ? amount.value : ''}
          onChange={(e) => {
            resetLevel(3);
            if (e.target.value) {
              setAmount(
                feeStructure[selectedNationality?.value || '']?.[selectedCourse?.value || '']?.[
                  selectedLevel?.value || ''
                ]?.[e.target.value]?.amount || null
              );
            }
          }}
          disabled={!selectedNationality || !selectedCourse || !selectedLevel}
        >
          <option value="">Select</option>
          {selectedLevel &&
            Object.keys(selectedLevel.tree)[0] !== 'ALL_LEVEL'
              ? Object.keys(selectedLevel.tree).map((fee) => (
                  <option key={fee} value={fee}>
                    {fee}
                  </option>
                ))
              : ['UG', 'PG', 'DIPLOMA', 'Ph.D'].map((fee) => (
                  <option key={fee} value={'ALL_LEVEL'}>
                    {fee}
                  </option>
                ))}
        </select>
      </div>
      <div>amount: {amount !== null ? amount : ''}</div>
    </div>
  );
};

export default FeeCalculator;
