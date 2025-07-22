"use client";
import React, { createContext, useState } from "react";

interface Props {
  tabValue: string;
  setTabValue: React.Dispatch<React.SetStateAction<string>>;
}

const defaultProps: Props = {
  tabValue: "",
  setTabValue: () => {
    throw new Error("setTabValue no está definido.");
  },
};

export const TabsPanelContext = createContext<Props>(defaultProps);

export function TabsPanelProvider({
  children,
  initialTab,
}: {
  children: React.ReactNode;
  initialTab: string;
}) {
  const [tabValue, setTabValue] = useState(initialTab);

  return (
    <TabsPanelContext.Provider
      value={{
        tabValue,
        setTabValue,
      }}
    >
      {children}
    </TabsPanelContext.Provider>
  );
}
