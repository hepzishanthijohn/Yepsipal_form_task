import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import QuestionForm from './components/questionform/QuestionForm';
import PreviewPage from './components/PreviewPage'; // Import PreviewPage component

const App = () => {
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
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Function to toggle preview mode
  const togglePreviewMode = () => {
    setIsPreviewMode((prevState) => !prevState);
  };

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

  return (
    <Router>
      <div>
        {/* Pass onPreviewToggle to Navbar */}
        <Navbar onPreviewToggle={togglePreviewMode} />
        <Routes>
          {/* Route for the Question Form */}
          <Route
            path="/"
            element={
              <QuestionForm
                formTitle={formTitle}
                questions={questions}
                isPreviewMode={isPreviewMode}
                handleFormTitleChange={handleFormTitleChange}
                handleQuestionTextChange={handleQuestionTextChange}
                handleInputTypeChange={handleInputTypeChange}
                addQuestion={addQuestion}
              />
            }
          />

          {/* Route for the Preview Page */}
          <Route
            path="/preview"
            element={<PreviewPage formTitle={formTitle} questions={questions} isPreviewMode={isPreviewMode} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
