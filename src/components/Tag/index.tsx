import { TagContainer } from './styles'

export type Props = {
  size?: 'small' | 'big'
  className?: string;
}

const Tag = ({ size = 'small', className }: Props) => (
  <TagContainer size={size} className={className}>
  </TagContainer>
)

export default Tag
