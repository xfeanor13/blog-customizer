import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useRef } from 'react';
import { Select } from '../../ui/select/Select';
import { RadioGroup } from '../../ui/radio-group/RadioGroup';
import { Separator } from '../../ui/separator/Separator';
import { useOutsideClickClose } from '../../ui/select/hooks/useOutsideClickClose';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
	defaultArticleState,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

interface Props {
	onApply: (style: StateForm) => void;
	onReset: () => void;
}

type StateForm = {
	fontFamilyOption: OptionType;
	fontSizeOption: OptionType;
	fontColor: OptionType;
	contentWidth: OptionType;
	backgroundColor: OptionType;
};

export const ArticleParamsForm = ({ onApply, onReset }: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const [stateForm, setStateForm] = useState<StateForm>({
		fontFamilyOption: defaultArticleState.fontFamilyOption,
		fontSizeOption: defaultArticleState.fontSizeOption,
		fontColor: defaultArticleState.fontColor,
		contentWidth: defaultArticleState.contentWidth,
		backgroundColor: defaultArticleState.backgroundColor,
	});

	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange: setIsOpen,
		onClose: () => setIsOpen(false),
	});

	const [selectedFontSize, setSelectedFontSize] = useState<OptionType>(
		defaultArticleState.fontSizeOption
	);
	const [selectedFontFamily, setSelectedFontFamily] = useState<OptionType>(
		defaultArticleState.fontFamilyOption
	);
	const [selectedFontColor, setSelectedFontColor] = useState<OptionType>(
		defaultArticleState.fontColor
	);
	const [selectedBackgroundColor, setSelectedBackgroundColor] =
		useState<OptionType>(defaultArticleState.backgroundColor);
	const [selectedContentWidth, setSelectedContentWidth] = useState<OptionType>(
		defaultArticleState.contentWidth
	);

	// Обработчик изменений выбранного значения
	const handleSelectionChangeFamily = (newSelectedValue: OptionType) => {
		setSelectedFontFamily(newSelectedValue);
		setStateForm((prevState) => ({
			...prevState,
			fontFamilyOption: newSelectedValue,
		}));
	};

	const handleSelectionChangeSize = (newSelectedValue: OptionType) => {
		setSelectedFontSize(newSelectedValue);
		setStateForm((prevState) => ({
			...prevState,
			fontSizeOption: newSelectedValue,
		}));
	};

	const handleSelectionChangeColor = (newSelectedValue: OptionType) => {
		setSelectedFontColor(newSelectedValue);
		setStateForm((prevState) => ({
			...prevState,
			fontColor: newSelectedValue,
		}));
	};

	const handleSelectionBackgroundColor = (newSelectedValue: OptionType) => {
		setSelectedBackgroundColor(newSelectedValue);
		setStateForm((prevState) => ({
			...prevState,
			backgroundColor: newSelectedValue,
		}));
	};

	const handleSelectionContentWidth = (newSelectedValue: OptionType) => {
		setSelectedContentWidth(newSelectedValue);
		setStateForm((prevState) => ({
			...prevState,
			contentWidth: newSelectedValue,
		}));
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		onApply(stateForm); // Применяем новые стили
	};

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			/>
			<aside
				ref={rootRef}
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Select
						selected={selectedFontFamily}
						onChange={handleSelectionChangeFamily}
						options={fontFamilyOptions}
						title='Шрифты'
						placeholder='Open Sans'
					/>
					<RadioGroup
						options={fontSizeOptions}
						name='size'
						selected={selectedFontSize}
						title='Размер шрифта'
						onChange={handleSelectionChangeSize}
					/>
					<Select
						selected={selectedFontColor}
						onChange={handleSelectionChangeColor}
						options={fontColors}
						title='Цвет шрифта'
						placeholder='shrifts'
					/>
					<Separator />
					<Select
						selected={selectedBackgroundColor}
						onChange={handleSelectionBackgroundColor}
						options={backgroundColors}
						title='Цвет фона'
					/>
					<Select
						selected={selectedContentWidth}
						onChange={handleSelectionContentWidth}
						options={contentWidthArr}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='button'
							onClick={() => {
								setStateForm({
									fontFamilyOption: defaultArticleState.fontFamilyOption,
									fontSizeOption: defaultArticleState.fontSizeOption,
									fontColor: defaultArticleState.fontColor,
									contentWidth: defaultArticleState.contentWidth,
									backgroundColor: defaultArticleState.backgroundColor,
								});
								setSelectedContentWidth(defaultArticleState.contentWidth);
								setSelectedBackgroundColor(defaultArticleState.backgroundColor);
								setSelectedFontColor(defaultArticleState.fontColor);
								setSelectedFontSize(defaultArticleState.fontSizeOption);
								setSelectedFontFamily(defaultArticleState.fontFamilyOption);
								onReset();
							}}
							type='clear'
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
