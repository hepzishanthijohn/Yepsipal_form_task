// Portal.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './navbar/Navbar';

function Portal() {
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  return (
    <div className="main-container">
      {/* Navbar at the top */}
      <Navbar setPreviewMode={setIsPreviewMode} />

      {/* Content area */}
      <div className="container " style={{ marginTop: '100px' }} >
        {/* Render the dynamic content (e.g., QuestionForm) */}
        <Outlet context={{ isPreviewMode, setPreviewMode: setIsPreviewMode }} />
      </div>
    </div>
  );
}

export default Portal;
