import { createSlice } from '@reduxjs/toolkit'
import { generateStarRating } from '../utils/utils'

const progressSlice = createSlice({
  name: 'progress',
  initialState: {
    currentQuestion: 0,
    currentQuestionAnswered: null,
    currentScore: 0,
    activeQuiz: {},
    quizScores: [],
    completedQuizzes: [],
    totalStars: 0,
    previousStars: 0,
    settings: {
      musicMuted: false,
      soundEffectsMuted: false,
    },
    firstLaunch: true,
  },
  reducers: {
    setSelectedLevel: (state, action) => {
      state.currentQuestion = 0
      state.currentQuestionAnswered = null
      state.currentScore = 0

      state.activeQuiz = action.payload
      state.activeQuiz.questions.forEach(question => {
        if (typeof question.shuffled_answers === 'undefined') {
          const allAnswers = [question.correct_answer, ...question.incorrect_answers]
          const shuffledAnswers = allAnswers
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
          question.shuffled_answers = shuffledAnswers
        }
      })
    },
    nextQuestion: state => {
      state.currentQuestion++
      state.currentQuestionAnswered = false
    },
    setCurrentQuestionAnswered: (state, action) => {
      state.currentQuestionAnswered = action.payload
    },
    increaseScore: state => {
      state.currentScore++
    },
    addCompletedQuiz: (state, action) => {
      const alreadyCompletedQuiz = state.completedQuizzes.find(quiz => quiz.id === action.payload.id)

      let alreadyEarnedStars = 0

      if (alreadyCompletedQuiz) {
        alreadyEarnedStars = generateStarRating(alreadyCompletedQuiz.score, action.payload.numQuestions, true)
        if (alreadyCompletedQuiz.score < action.payload.score) {
          // new high score
          alreadyCompletedQuiz.score = action.payload.score
        }
      } else {
        state.completedQuizzes.push(action.payload)
      }

      const newStars = generateStarRating(action.payload.score, action.payload.numQuestions, true)
      const starDifference = newStars - alreadyEarnedStars

      if (starDifference > 0) {
        state.previousStars = state.totalStars // track previous amount, before increase
        state.totalStars += starDifference
      }
    },
    toggleMusic: state => {
      state.settings.musicMuted = !state.settings.musicMuted
    },
    toggleSoundEffects: state => {
      state.settings.soundEffectsMuted = !state.settings.soundEffectsMuted
    },
    disableFirstLaunch: state => {
      state.firstLaunch = false
    },
  },
})

export const {
  setSelectedLevel,
  nextQuestion,
  setCurrentQuestionAnswered,
  increaseScore,
  addCompletedQuiz,
  toggleMusic,
  toggleSoundEffects,
  addStars,
  disableFirstLaunch,
} = progressSlice.actions

export default progressSlice
