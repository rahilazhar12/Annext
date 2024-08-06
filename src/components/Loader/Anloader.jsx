import React from 'react';
import { InfinitySpin } from 'react-loader-spinner';

const Anloader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <InfinitySpin
        visible={true}
        width="150"
        color="#000000"
        ariaLabel="infinity-spin-loading"
      />
    </div>
  );
}

export default Anloader;
