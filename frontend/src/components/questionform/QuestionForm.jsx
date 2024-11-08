import React, { useState } from 'react';


const QuestionForm = ({ isPreviewMode }) => {
  const [formTitle, setFormTitle] = useState('Untitled Form');
  const [questions, setQuestions] = useState([
    {
      questionId: 1, 
      questionText: '',
      options: [{ optionId: 1, optionText: '' }, { optionId: 2, optionText: '' }],
      inputType: 'MCQ', // Default input type
      sections: [], // Initially no sections
      nextSectionId: 1, // Start section ID from 1
    },
  ]);
  const [nextQuestionId, setNextQuestionId] = useState(2);

  // Handle form title change
  const handleFormTitleChange = (e) => setFormTitle(e.target.value);

  // Handle question text change
  const handleQuestionTextChange = (id, text) => {
    setQuestions((prev) =>
      prev.map((item) => (item.questionId === id ? { ...item, questionText: text } : item))
    );
  };

  // Handle changing the input type (MCQ or Textarea)
  const handleInputTypeChange = (questionId, inputType) => {
    setQuestions((prev) =>
      prev.map((item) =>
        item.questionId === questionId ? { ...item, inputType } : item
      )
    );
  };

  // Handle adding new question
  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        questionId: nextQuestionId,
        questionText: '',
        options: [{ optionId: 1, optionText: '' }, { optionId: 2, optionText: '' }],
        inputType: 'MCQ', // Default to MCQ for new questions
        sections: [], // Start with no sections
        nextSectionId: 1, // Reset section ID for new question
      },
    ]);
    setNextQuestionId(nextQuestionId + 1); // Increment next question ID
  };

  // Handle adding a new option for a specific question (limit to 8 options)
  const addOption = (questionId) => {
    setQuestions((prev) =>
      prev.map((item) =>
        item.questionId === questionId && item.options.length < 8
          ? {
              ...item,
              options: [
                ...item.options,
                { optionId: item.options.length + 1, optionText: '' }, // Add new option
              ],
            }
          : item
      )
    );
  };
  const deleteSection = (sectionId, questionId) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.questionId === questionId
          ? {
              ...q,
              sections: q.sections.filter((section) => section.sectionId !== sectionId),
            }
          : q
      )
    );
  };

  // Handle removing an option
  const removeOption = (questionId, optionId) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.questionId === questionId
          ? {
              ...q,
              options: q.options.filter((opt) => opt.optionId !== optionId),
            }
          : q
      )
    );
  };
  

  // Handle adding a new section for a specific question
  const addSection = (questionId) => {
    setQuestions((prev) =>
      prev.map((item) =>
        item.questionId === questionId
          ? {
              ...item,
              sections: [
                ...item.sections,
                {
                  sectionId: item.nextSectionId,
                  sectionTitle: `Section ${item.nextSectionId}`,
                  inputFields: [{ fieldId: 1, fieldText: '' }],
                },
              ],
              nextSectionId: item.nextSectionId + 1, // Increment section ID for this question
            }
          : item
      )
    );
  };

  // Handle adding a new input field to a specific section
  const addInputFieldInSection = (sectionId, questionId) => {
    setQuestions((prev) =>
      prev.map((item) =>
        item.questionId === questionId
          ? {
              ...item,
              sections: item.sections.map((section) =>
                section.sectionId === sectionId
                  ? {
                      ...section,
                      inputFields: [
                        ...section.inputFields,
                        { fieldId: section.inputFields.length + 1, fieldText: '' },
                      ],
                    }
                  : section
              ),
            }
          : item
      )
    );
  };

  // Handle submitting the form
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      formTitle,
      items: questions.map((item) => ({
        questionId: item.questionId,
        questionText: item.questionText,
        inputType: item.inputType, // Save the input type as well
        options: item.options,
        sections: item.sections,
      })),
    };
    console.log('Form Data:', JSON.stringify(formData, null, 2));
  };

  // If preview mode is true, render preview of the form
  if (isPreviewMode) {
    return (
      <div className="question-container" style={{ background: '#FDFEFF', marginTop: '100px' }}>
        <h3>{formTitle}</h3>
        {questions.map((item) => (
          <div key={item.questionId} className="mb-4">
            <div className="p-3 bg-white border rounded shadow-sm">
              <label className="form-label">Question {item.questionId}</label>
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
                        disabled
                        checked={false} // Logic for checked options can be added if necessary
                      />
                      <label htmlFor={`option-${option.optionId}`}>{option.optionText}</label>
                    </div>
                  ))}
                </div>
              )}
              {item.inputType === 'Textarea' && <p>{item.questionText}</p>}

              {/* Render Sections (if any) */}
              {item.sections.map((section) => (
                <div key={section.sectionId}>
                  <h5>{section.sectionTitle}</h5>
                  {section.inputFields.map((field) => (
                    <p key={field.fieldId}>{field.fieldText}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Else render editable form
  return (
 
<div className="container mt-4" style={{ background: '#FDFEFF' }}>
  <form onSubmit={handleSubmit}>
    {/* Form Title */}
    <div className="mb-4">
      <label htmlFor="formTitle" className="form-label">
        Form Title
      </label>
      <input
        type="text"
        id="formTitle"
        className="form-control"
        value={formTitle}
        onChange={handleFormTitleChange}
        placeholder="Enter form title"
        required
      />
    </div>

    {/* Row for Question Form and Add Section Button */}
    <div className="row">
      {/* Question Form on the Left */}
      <div className="col-md-8">
        {questions.map((item) => (
          <div key={item.questionId} className="mb-4">
            <div className="p-3 bg-white border rounded shadow-sm position-relative">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="w-100">
                  <label className="form-label mb-4">Question {item.questionId}</label>

                  {/* Render Input for Question Text */}
                  {item.inputType === 'MCQ' && (
                    <input
                      type="text"
                      className="form-control"
                      value={item.questionText}
                      onChange={(e) => handleQuestionTextChange(item.questionId, e.target.value)}
                      placeholder="Enter your question"
                      required
                    />
                  )}

                  {/* Render Textarea for Textarea Input Type */}
                  {item.inputType === 'Textarea' && (
                    <textarea
                      className="form-control"
                      value={item.questionText} // Use questionText for Textarea
                      onChange={(e) => handleQuestionTextChange(item.questionId, e.target.value)}
                      placeholder="Enter your question"
                      rows="4"
                      required
                    />
                  )}
                </div>

                {/* Dropdown Box on Top Right Corner */}
                <div className="position-absolute top-0 end-0 p-2">
                  <select
                    className="form-select"
                    aria-label="Input Type"
                    value={item.inputType}
                    onChange={(e) => handleInputTypeChange(item.questionId, e.target.value)}
                  >
                    <option value="MCQ">MCQ</option>
                    <option value="Textarea">Textarea</option>
                  </select>
                </div>
              </div>

              {/* Render MCQ Options */}
              {item.inputType === 'MCQ' && item.options.map((option, idx) => (
                <div key={option.optionId} className="input-group mb-2">
                  <input
                    type="text"
                    className="form-control"
                    value={option.optionText}
                    onChange={(e) =>
                      setQuestions((prev) =>
                        prev.map((i) =>
                          i.questionId === item.questionId
                            ? {
                                ...i,
                                options: i.options.map((opt) =>
                                  opt.optionId === option.optionId
                                    ? { ...opt, optionText: e.target.value }
                                    : opt
                                ),
                              }
                            : i
                        )
                      )
                    }
                    placeholder={`Option ${idx + 1}`}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-sm btn-danger ms-2"
                    onClick={() => removeOption(item.questionId, option.optionId)}
                  >
                    <i className="bi bi-x-circle-fill"></i>
                  </button>
                </div>
              ))}

              {/* Add Option Button */}
              {item.inputType === 'MCQ' && item.options.length < 8 && (
                <div className="d-flex justify-content-end mt-2">
                  <button
                    type="button"
                    className="btn btn-light border border-secondary text-dark mb-2"
                    onClick={() => addOption(item.questionId)}
                  >
                    <i className="bi bi-plus-circle me-2"></i> Add Option
                  </button>
                </div>
              )}

              {/* Render Sections */}
              {item.sections.map((section) => (
                <div key={section.sectionId} className="flex-grow-1 p-3 bg-white border rounded shadow-sm mt-4">
                  <div className="d-flex justify-content-between">
                    <div className="w-100">
                      <h5>{section.sectionTitle}</h5>
                      {section.inputFields.map((field) => (
                        <div key={field.fieldId} className="mb-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder={`Field ${field.fieldId}`}
                            value={field.fieldText}
                            onChange={(e) =>
                              setQuestions((prev) =>
                                prev.map((q) =>
                                  q.questionId === item.questionId
                                    ? {
                                        ...q,
                                        sections: q.sections.map((sec) =>
                                          sec.sectionId === section.sectionId
                                            ? {
                                                ...sec,
                                                inputFields: sec.inputFields.map((fld) =>
                                                  fld.fieldId === field.fieldId
                                                    ? { ...fld, fieldText: e.target.value }
                                                    : fld
                                                ),
                                              }
                                            : sec
                                        ),
                                      }
                                    : q
                                )
                              )
                            }
                            required
                          />
                        </div>
                      ))}
                    </div>

                    {/* Add Input Field Button */}
                    <div className="d-flex flex-column align-items-center ms-3" style={{ width: '40px' }}>
                      <button
                        type="button"
                        className="btn btn-light mb-2"
                        onClick={() => addInputFieldInSection(section.sectionId, item.questionId)}
                        title="Add Input Field"
                      >
                        <i className="bi bi-plus-circle-fill"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-light mb-2"
                        onClick={() => deleteSection(section.sectionId, item.questionId)}
                        title="Delete Section"
                      >
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add Section Button */}
              <div className="d-flex justify-content-end mt-4">
                <button
                  type="button"
                  className="btn btn-light border border-secondary text-dark mb-2"
                  onClick={() => addSection(item.questionId)}
                >
                  Add Section
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Question Button */}
      <div className="col-md-4 d-flex flex-column align-items-center justify-content-center">
        <button
          type="button"
          className="btn btn-light border border-secondary text-dark mb-3"
          onClick={addQuestion}
        >
          <i className="bi bi-plus-circle me-2"></i> Add Question
        </button>
      </div>
    </div>

    {/* Submit Button */}
    <div className="d-flex justify-content-end mb-3">
      <button type="submit" className="btn btn-success">
        Submit
      </button>
    </div>
  </form>
</div>

  );
};

export default QuestionForm;
