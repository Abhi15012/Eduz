import React, { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';



const useInternetCheck = () => {
  const [isConnected, setIsConnected] = useState <boolean>(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {

      setIsConnected(state.isConnected || false);
    });

    return () => unsubscribe();
  }, []);

  return isConnected;
};

export default useInternetCheck;
