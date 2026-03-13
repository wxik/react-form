/**
 *
 * @author zehua.tang
 * @since 2026-03-13 14:46
 */
import { CCList } from '@guc/react-form';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Button } from 'antd';
import type { FC } from 'react';

export const Operation: FC = () => {
  const { add, remove, index, length } = CCList.useItem();
  return (
    <div className={'flex items-center gap-2'}>
      <Button
        onClick={() => add(void 0, index + 1)}
        icon={<PlusIcon className="size-4" />}
        type="dashed"
      />
      <Button
        disabled={length === 1}
        onClick={() => remove()}
        icon={<MinusIcon className="size-4" />}
        type="dashed"
      />
    </div>
  );
};
