import snakeHeadImg from '../../../public/snake-head.gif'
import { SnakeState } from '../../redux/game-slice'
import { useAppSelector } from '../../redux/hooks'
import { TSnakeCellProps } from '../../types'
import { isSamePosition, position } from '../../utils'
import styles from './snake-cell.module.css'

function SnakeCell({ snake, row, col }: TSnakeCellProps) {
  const { direction } = useAppSelector(state => state.game) // предполагаем, что направление хранится в состоянии игры

  function getClassName(snake: SnakeState) {
    return isSnakeHead(snake) ? styles.head : styles.body
  }

  function isSnakeHead(snake: SnakeState) {
    return snake.head && isSamePosition(snake.head, position(row, col))
  }

  function getHeadRotation() {
    switch (direction) {
      case 'UP':
        return 'rotate(0deg)'
      case 'RIGHT':
        return 'rotate(90deg)'
      case 'DOWN':
        return 'rotate(180deg)'
      case 'LEFT':
        return 'rotate(270deg)'
      default:
        return 'rotate(0deg)'
    }
  }

  return (
    <div className={styles.snake}>
      <div
        className={getClassName(snake)}
        style={isSnakeHead(snake) ? { transform: getHeadRotation() } : {}}
      >
        {isSnakeHead(snake) ? <img src={snakeHeadImg} alt='Snake Head' /> : null}
      </div>
    </div>
  )
}

export default SnakeCell
