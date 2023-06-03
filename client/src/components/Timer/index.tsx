import Countdown from 'react-countdown-now';

//styles
import styles from './Timer.module.scss'

type TimerProps = {
    timeout: number,
    onTimerComplete: () => void
}

type RendererProps = {
    minutes: number,
    seconds: number,
    completed: boolean
}

const Timer: React.FC<TimerProps> = ({ timeout, onTimerComplete }) => {
    const endTime = Date.now() + timeout;

    const handleTimerComplete = () => {
        onTimerComplete();
    };

    const renderer: React.FC<RendererProps> = ({ minutes, seconds, completed }) => {
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