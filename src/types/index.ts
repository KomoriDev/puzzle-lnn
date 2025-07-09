export interface Puzzle {
  id: number
  title: string
  content: string
  solution: string
  difficulty: ['easy', 'medium', 'difficulty']
  created_by: number
  created_at: Date
}
