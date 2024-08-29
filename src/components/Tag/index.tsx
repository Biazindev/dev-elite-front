import { TagContainer } from './styles'
import { PiStarFill } from "react-icons/pi";



export type Props = {
  size?: 'small' | 'big'
  className?: string
  value: number
}

const Tag = ({ size = 'small', className, value }: Props) => (
  <TagContainer value={value} size={size} className={className}>
    <div><span><PiStarFill size={20} color={'#FFC312'}/></span>{value}</div>
  </TagContainer>
)

export default Tag
