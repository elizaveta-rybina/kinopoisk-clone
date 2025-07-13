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
	const [localValue, setLocalValue] = useState(value)

	useEffect(() => {
		setLocalValue(value)
	}, [value])

	const handleChange = (delta: number) => {
		const newValue = Math.min(Math.max(localValue + delta, min), max)
		setLocalValue(newValue)
		onChange(newValue)
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = Math.min(
			Math.max(parseFloat(e.target.value) || min, min),
			max
		)
		setLocalValue(newValue)
		onChange(newValue)
	}

	return (
		<div className='space-y-1'>
			<div className='flex items-center space-x-2'>
				<button
					onClick={() => handleChange(-step)}
					className='bg-orange-300 text-white px-2 py-1 rounded-2xl hover:bg-orange-500'
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
					className='w-16 text-black text-center rounded-2xl p-1 border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400'
				/>
				<button
					onClick={() => handleChange(step)}
					className='bg-orange-300 text-white px-2 py-1 rounded-2xl hover:bg-orange-500'
				>
					<FaArrowRightLong />
				</button>
			</div>
		</div>
	)
}
