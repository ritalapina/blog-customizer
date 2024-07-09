import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';
import clsx from 'clsx';
import { forwardRef } from 'react';

export type OnClick = () => void;

export type Props = {
	toggleForm: () => void;
	formIsOpened: boolean;
};

export const ArrowButton = forwardRef<HTMLDivElement, Props>(
	({ toggleForm, formIsOpened }, ref) => {
		return (
			<div
				ref={ref}
				onClick={toggleForm}
				role='button'
				aria-label='Открыть/Закрыть форму параметров статьи'
				tabIndex={0}
				className={clsx(styles.container, {
					[styles.container_open]: formIsOpened,
				})}>
				<img
					src={arrow}
					alt='иконка стрелочки'
					className={clsx(styles.arrow, { [styles.arrow_open]: formIsOpened })}
				/>
			</div>
		);
	}
);