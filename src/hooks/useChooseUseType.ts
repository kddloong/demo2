import { useEffect, useState } from 'react';
import { stringToCheckBox } from '@/utils/utils';

const useChooseUseType = (useType: string) => {
  const [cardUseType, setCardUseType] = useState<string[]>([]);

  useEffect(() => {
    const result = stringToCheckBox(useType);

    setCardUseType(result);
  }, [useType]);

  return cardUseType;
};

export { useChooseUseType };
