import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useRef, useState } from 'react';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Text } from 'src/ui/text';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: (param: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
	const [selectArticleState, setSelectArticleState] =
		useState<ArticleStateType>(articleState);

	const outsideClickRef = useRef<HTMLDivElement | null>(null);

	const inputChangeHandler = (
		key: keyof ArticleStateType,
		value: OptionType
	) => {
		setSelectArticleState((prevState) => ({ ...prevState, [key]: value }));
	};

	const applyFormSubmitHandler = (e: FormEvent) => {
		e.preventDefault();
		setArticleState(selectArticleState);
	};

	const clearButtonHandler = () => {
		setSelectArticleState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	const handleOutsideClickClose = useOutsideClickClose({
		isOpen: isOpenForm,
		rootRef: outsideClickRef,
		onClose: () => setIsOpenForm(false),
		onChange: setIsOpenForm,
	});
	handleOutsideClickClose;

	return (
		<>
			<div ref={outsideClickRef}>
				<ArrowButton
					isOpen={isOpenForm}
					onClick={() => {
						setIsOpenForm(!isOpenForm);
					}}
				/>
				<aside
					className={clsx(
						styles.container,
						isOpenForm && styles.container_open
					)}>
					<form className={styles.form} onSubmit={applyFormSubmitHandler}>
						<Text as='h2' size={31} weight={800} uppercase dynamicLite>
							Задайте параметры
						</Text>
						<label className={clsx(styles.label)}>
							<Text as='h3' size={12} weight={800} uppercase dynamicLite>
								Шрифт
							</Text>
							<Select
								options={fontFamilyOptions}
								selected={selectArticleState.fontFamilyOption}
								onChange={(selectElement: OptionType) =>
									inputChangeHandler('fontFamilyOption', selectElement)
								}
							/>
						</label>

						<label className={clsx(styles.label)}>
							<Text as='h3' size={12} weight={800} uppercase dynamicLite>
								Размер шрифта
							</Text>
							<RadioGroup
								name=''
								title=''
								options={fontSizeOptions}
								selected={selectArticleState.fontSizeOption}
								onChange={(selectElement: OptionType) =>
									inputChangeHandler('fontSizeOption', selectElement)
								}
							/>
						</label>

						<label className={clsx(styles.label)}>
							<Text as='h3' size={12} weight={800} uppercase dynamicLite>
								Цвет шрифта
							</Text>
							<Select
								options={backgroundColors}
								selected={selectArticleState.backgroundColor}
								onChange={(selectElement: OptionType) =>
									inputChangeHandler('backgroundColor', selectElement)
								}
							/>
						</label>

						<Separator></Separator>

						<label className={clsx(styles.label)}>
							<Text as='h3' size={12} weight={800} uppercase dynamicLite>
								Цвет фона
							</Text>
							<Select
								options={fontColors}
								selected={selectArticleState.fontColor}
								onChange={(selectElement: OptionType) =>
									inputChangeHandler('fontColor', selectElement)
								}
							/>
						</label>

						<label className={clsx(styles.label)}>
							<Text as='h3' size={12} weight={800} uppercase dynamicLite>
								Ширина контента
							</Text>
							<Select
								options={contentWidthArr}
								selected={selectArticleState.contentWidth}
								onChange={(selectElement: OptionType) =>
									inputChangeHandler('contentWidth', selectElement)
								}
							/>
						</label>

						<div className={styles.bottomContainer}>
							<div onClick={clearButtonHandler}>
								<Button title='Сбросить' htmlType='reset' type='clear' />
							</div>
							<div>
								<Button title='Применить' htmlType='submit' type='apply' />
							</div>
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
