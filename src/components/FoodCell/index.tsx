import styles from './food-cell.module.css'

function FoodCell() {
	return (
		<div className={styles.foodDiv}>
			<img src='/apple.webp' className={styles.foodApple} />
		</div>
	)
}

export default FoodCell