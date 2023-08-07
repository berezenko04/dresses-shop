import Countdown from 'react-countdown';

//styles
import styles from './Timer.module.scss'

type TTimerProps = {
    timeout: number,
    onTimerComplete: () => void
}

type TRendererProps = {
    minutes: number,
    seconds: number,
    completed: boolean
}

const Timer: React.FC<TTimerProps> = ({ timeout, onTimerComplete }) => {
    const endTime = Date.now() + timeout;

    const handleTimerComplete = () => {
        onTimerComplete();
    };

    const renderer: React.FC<TRendererProps> = ({ minutes, seconds, completed }) => {
        if (completed) {
            return <></>;
        } else {
            return (
                <span className={styles.timer}>
                    {minutes >= 10 ? minutes : `0${minutes}`}:{seconds >= 10 ? seconds : `0${seconds}`}
                </span>
            );
        }
    };

    return <Countdown date={endTime} renderer={renderer} onComplete={handleTimerComplete} />;
}

export default Timer