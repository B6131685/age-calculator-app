import s from './style.module.css'
type Props = {
    value: number | string,
    unit: 'days' | 'months' | 'years'
}
const Result = ({value, unit}: Props) => {
  return (
    <div className={s.style}>
        <span className={s.value}>{value ? value : "--"}</span>
        &nbsp;{unit}
    </div>
  )
}

export default Result