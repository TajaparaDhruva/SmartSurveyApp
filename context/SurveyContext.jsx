import React, { createContext, useContext, useState } from "react";

const SurveyContext = createContext();

const initialSurveys = [
  {
    id: "1",
    site: "ABC Company",
    client: "John",
    description: "Site inspection completed successfully.",
    priority: "High",
    date: "Mon Jul 20 2026",
  },
  {
    id: "2",
    site: "XYZ Factory",
    client: "David",
    description: "Factory safety audit completed.",
    priority: "Medium",
    date: "Sun Jul 19 2026",
  },
  {
    id: "3",
    site: "Royal Mall",
    client: "Amit",
    description: "Electrical setup verified.",
    priority: "Low",
    date: "Sat Jul 18 2026",
  },
  {
    id: "4",
    site: "Tech Park",
    client: "Rahul",
    description: "Network wiring inspection.",
    priority: "High",
    date: "Fri Jul 17 2026",
  },
];

export const SurveyProvider = ({ children }) => {
  const [surveys, setSurveys] = useState(initialSurveys);

  const addSurvey = (surveyData) => {
    const newSurvey = {
      id: Date.now().toString(),
      site: surveyData.siteName || surveyData.site || "Untitled Site",
      client: surveyData.clientName || surveyData.client || "N/A",
      description: surveyData.description || "",
      priority: surveyData.priority || "Medium",
      date: surveyData.date || new Date().toDateString(),
    };
    setSurveys((prev) => [newSurvey, ...prev]);
  };

  const deleteSurvey = (id) => {
    setSurveys((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <SurveyContext.Provider value={{ surveys, addSurvey, deleteSurvey }}>
      {children}
    </SurveyContext.Provider>
  );
};

export const useSurveys = () => {
  const context = useContext(SurveyContext);
  if (!context) {
    return {
      surveys: [],
      addSurvey: () => {},
      deleteSurvey: () => {},
    };
  }
  return context;
};
