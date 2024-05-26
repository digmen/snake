import { useState, useEffect } from 'react'


const Controller = () => {
	const [isActive, setIsActive] = useState(false)
	// const [audio] = useState(new Audio('/snakemusic.mp3'))
	// const [volume, setVolume] = useState(0.5)

	const simulateKeyPress = (key: string) => {
		if (!isActive) return
		const event = new KeyboardEvent('keydown', { code: key })
		window.dispatchEvent(event)
	}

	const handleStartGame = () => {
		setIsActive(!isActive)
	}

	// const handleVolumeChange = (event) => {
	// 	const newVolume = event.target.value
	// 	setVolume(newVolume)
	// 	audio.volume = newVolume
	// }

	// useEffect to handle playing and pausing the music
	// useEffect(() => {
	// 	if (isActive) {
	// 		audio.play().catch(error => {
	// 			console.error('Error playing audio:', error)
	// 		})
	// 	} else {
	// 		audio.pause()
	// 	}
	// }, [isActive, audio])

	// useEffect to handle volume changes
	// useEffect(() => {
	// 	audio.volume = volume
	// }, [volume, audio])

	return (
		<div className='controls'>
			<button onClick={() => simulateKeyPress('KeyW')} disabled={!isActive}>
				<img className='icon-button' src='/arrow-top.svg' alt='Top' />
			</button>
			<div>
				<button onClick={() => simulateKeyPress('KeyA')} disabled={!isActive}>
					<img className='icon-button' src='/arrow-left.svg' alt='Left' />
				</button>
				<button onClick={handleStartGame}>
					<img className='icon-button' src='/arrow-center.svg' alt='Start' />
				</button>
				<button onClick={() => simulateKeyPress('KeyD')} disabled={!isActive}>
					<img className='icon-button' src='/arrow-right.svg' alt='Right' />
				</button>
			</div>
			<button onClick={() => simulateKeyPress('KeyS')} disabled={!isActive}>
				<img className='icon-button' src='/arrow-bottom.svg' alt='Bottom' />
			</button>
			{/* <div className='volume-control'>
				<label htmlFor='volume'>Volume:</label>
				<input
					type='range'
					id='volume'
					name='volume'
					min='0'
					max='1'
					step='0.01'
					value={volume}
					onChange={handleVolumeChange}
				/>
			</div> */}
		</div>
	)
}

export default Controller
