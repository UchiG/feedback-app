import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: "This is a feedback item from the context section",
      rating: 8,
    },
    {
      id: 2,
      text: "This is the 2nd item from the context section, add your own above",
      rating: 9,
    },
    {
      id: 3,
      text: "This is some more from the context section, add your own above",
      rating: 10,
    },
  ]);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });
  

  const deleteFeedback = (id) => {
    if (window.confirm("Are you sure you want to delete this feedback")) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  
  const addFeedback = (newFeedback) => {
      newFeedback.id = uuidv4();
      setFeedback([newFeedback, ...feedback]);
    };
    
  const updateFeedback = (id, updItem) => {
    setFeedback(feedback.map((item) => item.id === id ? { ...item, ...updItem } : item))
  }

  const editFeedback = (item) => {
    setFeedbackEdit({ 
        item, 
        edit: true 
    })
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
