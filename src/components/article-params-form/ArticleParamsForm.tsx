import { useRef, useState } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'components/arrow-button';
import styles from './ArticleParamsForm.module.scss';
import { Text } from '../text';
import { Select } from '../select';
import {
    type ArticleStateType,
    type OptionType,
    defaultArticleState,
    fontFamilyOptions,
    fontSizeOptions,
    fontColors,
    backgroundColors,
    contentWidthArr,
} from '../../constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from 'components/separator';
import { Button } from 'components/button';
import { useClickClose } from '../../hooks/useClickClose';

type ArticleParamsFormProps = {
    applySettings: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
    applySettings,
}: ArticleParamsFormProps) => {
    const [formIsOpened, setFormIsOpened] = useState(false);
    const [formSettings, setFormSettings] = useState<ArticleStateType>(defaultArticleState);
    const refForm = useRef<HTMLFormElement | null>(null);

    const toggleForm = () => {
        setFormIsOpened((prev) => !prev);
    };

    useClickClose({
        isOpen: formIsOpened,
        onClose: toggleForm,
        rootRef: refForm,
    });

    const resetFormSettings = () => {
        setFormSettings(defaultArticleState);
        applySettings(defaultArticleState);
        toggleForm();
    };
    
    const handleChange = (field: keyof ArticleStateType) => (selected: OptionType) => {
        setFormSettings((prevSettings) => ({
            ...prevSettings,
            [field]: selected,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        applySettings(formSettings);
        toggleForm();
    };

    return (
        <>
            <ArrowButton toggleForm={toggleForm} formIsOpened={formIsOpened} />
            <aside
                className={clsx(styles.container, {
                    [styles.container_open]: formIsOpened,
                })}>
                <form className={styles.form} ref={refForm} onSubmit={handleSubmit}>
                    <Text children="Задайте параметры" as="h2" size={31} weight={800} uppercase={true} />
                    
                    <Select
                        selected={formSettings.fontFamilyOption}
                        options={fontFamilyOptions}
                        placeholder="Выберите шрифт"
                        title="Шрифт"
                        onChange={handleChange('fontFamilyOption')}
                    />

                    <RadioGroup
                        name="Размер шрифта"
                        title="Размер шрифта"
                        options={fontSizeOptions}
                        selected={formSettings.fontSizeOption}
                        onChange={handleChange('fontSizeOption')}
                    />

                    <Select
                        selected={formSettings.fontColor}
                        options={fontColors}
                        placeholder="Выберите цвет текста"
                        title="Цвет шрифта"
                        onChange={handleChange('fontColor')}
                    />

                    <Separator />

                    <Select
                        selected={formSettings.backgroundColor}
                        options={backgroundColors}
                        placeholder="Выберите цвет фона"
                        title="Цвет фона"
                        onChange={handleChange('backgroundColor')}
                    />

                    <Select
                        selected={formSettings.contentWidth}
                        options={contentWidthArr}
                        placeholder="Выберите ширину контента"
                        title="Ширина контента"
                        onChange={handleChange('contentWidth')}
                    />

                    <div className={styles.bottomContainer}>
                        <Button title="Сбросить" type="reset" onClick={resetFormSettings} />
                        <Button title="Применить" type="submit" />
                    </div>
                </form>
            </aside>
        </>
    );
};