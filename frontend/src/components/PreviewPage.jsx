import React from 'react';

const PreviewPage = ({ formTitle, questions, isPreviewMode }) => {
  return (
    <div className="container mt-5" style={{ background: '#FDFEFF', marginTop: '100px' }}>
      <h1>Preview Mode</h1>
      <p>{isPreviewMode ? "This is the preview" : "Preview is off"}</p>
      <h3>{formTitle}</h3>
      {questions.map((item) => (
        <div key={item.questionId}>
          <h4>Question {item.questionId}</h4>
          <p>{item.questionText}</p>
          {item.inputType === 'MCQ' && (
            <div>
              {item.options.map((option) => (
                <div key={option.optionId}>
                  <input
                    type="radio"
                    id={`option-${option.optionId}`}
                    name={`question-${item.questionId}`}
                    value={option.optionText}
                    disabled={isPreviewMode} // Disable input in preview mode
                  />
                  <label htmlFor={`option-${option.optionId}`}>{option.optionText}</label>
                </div>
              ))}
            </div>
          )}
          {item.inputType === 'Textarea' && <textarea rows="3" disabled={isPreviewMode}></textarea>}
        </div>
      ))}
    </div>
  );
};

export default PreviewPage;
