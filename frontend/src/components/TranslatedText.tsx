import React, { useEffect, useState } from 'react';
import { Typography, TypographyProps, Skeleton } from '@mui/material';
import { useLanguage } from '../contexts/LanguageContext';

interface TranslatedTextProps extends Omit<TypographyProps, 'children'> {
  text: string;
}

const TranslatedText: React.FC<TranslatedTextProps> = ({ text, ...props }) => {
  const { translate, currentLanguage, isLoading } = useLanguage();
  const [translatedText, setTranslatedText] = useState(text);

  useEffect(() => {
    const translateText = async () => {
      const result = await translate(text);
      setTranslatedText(result);
    };

    if (currentLanguage.code !== 'en') {
      translateText();
    } else {
      setTranslatedText(text);
    }
  }, [text, currentLanguage, translate]);

  if (isLoading) {
    return <Skeleton width="100%" />;
  }

  return (
    <Typography {...props}>
      {translatedText}
    </Typography>
  );
};

export default TranslatedText; 