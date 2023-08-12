import React, {createContext, useContext, useState} from 'react';

// Define the shape of the context data
interface AppContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  // Add more values here in the future
}

// Create the context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create a provider component
export const AppProvider: React.FC = ({children}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(prevIsDarkMode => !prevIsDarkMode);
  };

  const contextValue: AppContextType = {
    isDarkMode,
    toggleDarkMode,
    // Add more values here in the future
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

// Custom hook for accessing the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
