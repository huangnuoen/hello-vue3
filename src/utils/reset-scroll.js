import { isMobile } from '@/utils/tool'
import { getRootScrollTop, setRootScrollTop } from './scroll'

/* istanbul ignore next */
export function resetScroll() {
  if (isMobile.iOS()) {
    setRootScrollTop(getRootScrollTop())
  }
}
