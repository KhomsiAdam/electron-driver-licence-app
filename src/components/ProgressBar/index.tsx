import { useEffect, useState } from 'react';

export const ProgressBar = ({ done }: any) => {
  const [style, setStyle] = useState({});
  const [percentage, setPercentage] = useState<number>();

  useEffect(() => {
    setPercentage(done * 10);
    const newStyle = {
      opacity: 1,
      width: `${percentage}%`,
    };
    setStyle(newStyle);
  }, [done, percentage, setPercentage]);

  return (
    <div className='relative w-full h-8 my-4 rounded-full bg-secondary-100'>
      <div className='flex items-center justify-center w-0 h-full rounded-full opacity-0 progress-bar' style={style}></div>
    </div>
  );
};

export default ProgressBar;
