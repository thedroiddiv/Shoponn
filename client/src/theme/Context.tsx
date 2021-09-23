import React from 'react';
export const ThemeContext = React.createContext<[boolean,(arg: boolean)=>void]>([false,() => {}])