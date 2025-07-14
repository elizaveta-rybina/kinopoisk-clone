import { useEffect, useState } from 'react'
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6'

interface NumberStepperProps {
	value: number
	min: number
	max: number
	step: number
	onChange: (value: number) => void
}

export const NumberStepper = ({
	value,
	min,
	max,
	step,
	onChange
}: NumberStepperProps) => {
	const [localValue, setLocalValue] = useState<string | number>(value)

	useEffect(() => {
		setLocalValue(value)
	}, [value])

	const handleChange = (delta: number) => {
		const newValue = Math.min(Math.max(Number(localValue) + delta, min), max)
		setLocalValue(newValue)
		onChange(newValue)
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const rawValue = e.target.value.replace(',', '.')
		setLocalValue(rawValue) // Сохраняем сырой ввод пользователя
	}

	const handleBlur = () => {
		const parsedValue = parseInt(localValue as string, 10) // Используем parseInt для годов
		if (isNaN(parsedValue) || localValue === '') {
			setLocalValue(min) // Если ввод некорректен, устанавливаем минимальное значение
			onChange(min)
			return
		}
		const newValue = Math.min(Math.max(parsedValue, min), max)
		setLocalValue(newValue)
		onChange(newValue)
	}

	const isMinDisabled = Number(localValue) <= min
	const isMaxDisabled = Number(localValue) >= max

	return (
		<div className='space-y-1 sm:space-y-2'>
			<div className='flex items-center space-x-1 sm:space-x-2'>
				<button
					onClick={() => handleChange(-step)}
					disabled={isMinDisabled}
					className={`bg-orange-300 text-white p-1 sm:p-2 text-sm sm:text-base rounded-2xl hover:bg-orange-500 transition-colors ${
						isMinDisabled ? 'opacity-50 cursor-not-allowed' : ''
					}`}
				>
					<FaArrowLeftLong />
				</button>

				<input
					type='number'
					value={localValue}
					min={min}
					max={max}
					step={step}
					onChange={handleInputChange}
					onBlur={handleBlur} // Обрабатываем завершение ввода
					className='w-12 sm:w-16 text-sm sm:text-base text-black text-center rounded-2xl p-1 sm:p-2 border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400 appearance-none [&::-webkit-outer-spin-button]:hidden [&::-webkit-inner-spin-button]:hidden'
				/>

				<button
					onClick={() => handleChange(step)}
					disabled={isMaxDisabled}
					className={`bg-orange-300 text-white p-1 sm:p-2 text-sm sm:text-base rounded-2xl hover:bg-orange-500 transition-colors ${
						isMaxDisabled ? 'opacity-50 cursor-not-allowed' : ''
					}`}
				>
					<FaArrowRightLong />
				</button>
			</div>
		</div>
	)
}
