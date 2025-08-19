import React from 'react';

const FeaturedImage = () => {
  return (
    <div className="flex grow bg-[#fcfcf8] @container p-4">
      <div className="w-full gap-1 overflow-hidden bg-[#fcfcf8] @[480px]:gap-2 aspect-[3/2] rounded-xl flex">
        <div 
          className="w-full bg-center bg-no-repeat bg-cover aspect-auto rounded-none flex-1"
          style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAG0JYe7VirefSEzjiy3R6hWYMxGAf-wxhXVpaYDDo9nFViAZpBqZfl1w5saOCPIGqd57c7-ytGXgU96ZhD7m8ME35bpuIjpD31jd3aBrtEWm1SWWotaLV2nS8DNBnaMH85fIMpbKp20E6KQQEkI_pJAKYeclhF0_kmqb5DssfRK4XTGeUeJoV_pl5JXEFzoFUd8HAwcBWq3sKXn8Q4UARdD1l_OARAMmvHjLA0ignSClOHA5pwxaBDOVBwRp-pZVVBLXtZ7U4XfPrP")' }}
        ></div>
      </div>
    </div>
  );
};

export default FeaturedImage;