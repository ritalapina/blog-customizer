
import { CSSProperties, useState } from 'react';
import clsx from 'clsx';
import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
  defaultArticleState,
  type ArticleStateType,
} from '../../constants/articleProps';
import styles from './App.module.scss';

export const App = () => {
  const [settings, setSettings] = useState<ArticleStateType>(defaultArticleState);

  const applySettings = (newSettings: ArticleStateType) => {
    setSettings(newSettings);
  };

  return (
    <div
      className={clsx(styles.main)}
      style={
        {
          '--font-family': settings.fontFamilyOption.value,
          '--font-size': settings.fontSizeOption.value,
          '--font-color': settings.fontColor.value,
          '--container-width': settings.contentWidth.value,
          '--bg-color': settings.backgroundColor.value,
        } as CSSProperties
      }
    >
      <ArticleParamsForm applySettings={applySettings} />
      <Article />
    </div>
  );
};

