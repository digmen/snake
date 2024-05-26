import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
 GAME_MODE,
 initialFoodState,
 initialGridState,
 initialSnakeState,
} from '../constants'
import { TPosition, TSnakeBodyMap } from '../types'
import { generateFood, position, positionID } from '../utils'

export interface SnakeState {
 head: TPosition | undefined
 tail: TPosition | undefined
 bodyArray: TPosition[]
 bodyMap: TSnakeBodyMap
 canGrow: boolean
}

export interface GameState {
 snake: SnakeState
 food: TPosition
 score: number
 grid: number[][]
 mode: string
 direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' // новое свойство для направления
}

const initialState: GameState = {
 snake: {
  ...initialSnakeState,
  head: initialSnakeState.bodyArray[0], // начальное положение головы
  tail: initialSnakeState.bodyArray[initialSnakeState.bodyArray.length - 1], // начальное положение хвоста
 },
 food: initialFoodState,
 score: 0,
 grid: initialGridState,
 mode: GAME_MODE.WALLS,
 direction: 'LEFT', // начальное направление
}

const snakeSlice = createSlice({
 name: 'game',
 initialState,
 reducers: {
  move: (state, action: PayloadAction<TPosition>) => {
   const positionShift = action.payload
   const snake = state.snake

   // обновляем направление
   if (positionShift.row > 0) state.direction = 'DOWN'
   else if (positionShift.row < 0) state.direction = 'UP'
   else if (positionShift.col > 0) state.direction = 'RIGHT'
   else if (positionShift.col < 0) state.direction = 'LEFT'

   const currentHead = snake.head as TPosition
   const newHead = position(
    currentHead.row + positionShift.row,
    currentHead.col + positionShift.col
   )
   // обновляем позицию головы
   snake.head = newHead
   if (snake.canGrow === false) {
    // удаляем предыдущий хвост и обновляем его
    snake.bodyArray = snake.bodyArray.slice(0, snake.bodyArray.length - 1)
    delete snake.bodyMap[positionID(snake.tail as TPosition)]
    snake.tail = snake.bodyArray[snake.bodyArray.length - 1]
   } else snake.canGrow = false

   // обновляем тело новой головой
   snake.bodyMap[positionID(newHead)] = newHead
   snake.bodyArray.unshift(newHead)
  },

  eat(state) {
   state.snake.canGrow = true
   state.score++
   state.food = generateFood(state.snake.bodyMap, state.grid)
  },

  reset: state => {
   state.snake = {
    ...initialSnakeState,
    head: initialSnakeState.bodyArray[0],
    tail: initialSnakeState.bodyArray[
     initialSnakeState.bodyArray.length - 1
    ],
   }
   state.score = 0
   state.direction = 'LEFT' // сбрасываем направление при перезагрузке игры
  },

  toggleGameMode(state) {
   switch (state.mode) {
    case GAME_MODE.NO_WALLS:
     state.mode = GAME_MODE.WALLS
     break
    case GAME_MODE.WALLS:
     state.mode = GAME_MODE.NO_WALLS
     break
   }
  },
 },
})

export const { move, reset, eat, toggleGameMode } = snakeSlice.actions
export default snakeSlice.reducer