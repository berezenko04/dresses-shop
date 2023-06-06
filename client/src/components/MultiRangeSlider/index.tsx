import React, { useCallback, useEffect, useState, useRef } from "react";
import cn from 'classnames'

//styles
import styles from "./MultiRangeSlider.module.scss";


type TMultiRangeSliderProps = {
    min: number,
    max: number,
    onChange: (props: { min: number, max: number }) => void
}

const MultiRangeSlider: React.FC<TMultiRangeSliderProps> = ({ min, max, onChange }) => {
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const minValRef = useRef(min);
    const maxValRef = useRef(max);
    const timeoutRef = useRef<number | null>(null);
    const range = useRef<HTMLInputElement | null>(null);

    // Convert to percentage
    const getPercent = useCallback(
        (value: number) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    // Set width of the range to decrease from the left side
    useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxValRef.current);

        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minVal, getPercent]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        const minPercent = getPercent(minValRef.current);
        const maxPercent = getPercent(maxVal);

        if (range.current) {
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxVal, getPercent]);

    // Get min and max values when their state changes
    useEffect(() => {
        onChange({ min: minVal, max: maxVal });
    }, [minVal, maxVal]);

    return (
        <div className={styles.multiRange}>
            <input
                type="range"
                min={min}
                max={max}
                value={minVal}
                onChange={(event) => {
                    const value = Math.min(Number(event.target.value), maxVal - 1);
                    if (value !== minVal) {
                        setMinVal(value);
                        minValRef.current = value;
                    }
                }}
                className={cn(styles.multiRange__thumb, styles.multiRange__thumb_left)}
                style={{ zIndex: minVal > max - 100 ? '5' : '' }}
            />
            <input
                type="range"
                min={min}
                max={max}
                value={maxVal}
                onChange={(event) => {
                    const value = Math.max(Number(event.target.value), minVal + 1);
                    if (value !== maxVal) {
                        setMaxVal(value);
                        maxValRef.current = value;
                    }
                }}
                className={cn(styles.multiRange__thumb, styles.multiRange__thumb_right)}
            />

            <div className={styles.multiRange__slider}>
                <div className={styles.multiRange__slider__track} />
                <div ref={range} className={styles.multiRange__slider__range} />
                <span className={styles.multiRange__slider__left}>{minVal} UAH</span>
                <span className={styles.multiRange__slider__right}>{maxVal} UAH</span>
            </div>
        </div>
    );
};

export default MultiRangeSlider