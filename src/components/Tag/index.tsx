import { PiStarFill } from "react-icons/pi"

import { TagContainer } from './styles'

export type Props = {
  size?: 'small' | 'big'
  className?: string
  value: number
}

const Tag = ({ size = 'small', className, value }: Props) => (
  <TagContainer value={value} size={size} className={className}>
    <div><span><PiStarFill /></span><p>{value}</p></div>
  </TagContainer>
)

export default Tag
