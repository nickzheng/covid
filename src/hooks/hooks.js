import React, { useContext } from 'react';

export const ServerContext = React.createContext({});

export const useServer = () => useContext(ServerContext);
