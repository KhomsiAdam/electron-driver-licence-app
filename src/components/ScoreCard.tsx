import { Iquiz } from '../pages/Home';
interface IProps {
  totalScore: number;
  currentQuiz: number;
  quizzes: Iquiz[];
}
export default function ScoreCard({
  totalScore,
  currentQuiz,
  quizzes,
}: IProps) {
  return (
    <div className='container relative flex flex-col items-end mx-auto text-2xl score-card'>
      <div className='my-2'>
        Score: <span className='ml-4'>{totalScore}</span>{' '}
      </div>
      <div className='my-2'>
        Questions Left:{' '}
        <span className='ml-4'> {quizzes.length - (currentQuiz + 1)}</span>
      </div>
      <br />
    </div>
  );
}
