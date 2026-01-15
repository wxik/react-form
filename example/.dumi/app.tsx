/**
 *
 * @author zehua.tang
 * @since 2026-01-16 11:25
 */

import { StyleProvider } from '@ant-design/cssinjs';
import type { ReactElement } from 'react';

export function rootContainer(container: ReactElement) {
  return <StyleProvider layer>{container}</StyleProvider>;
}
