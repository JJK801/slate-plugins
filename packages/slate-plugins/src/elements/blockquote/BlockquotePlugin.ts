import { Editor } from 'slate';
import { SlatePlugin } from '@udecode/slate-plugins-core';
import { DEFAULTS_BLOCKQUOTE } from './defaults';
import { deserializeBlockquote } from './deserializeBlockquote';
import { renderElementBlockquote } from './renderElementBlockquote';
import { BlockquotePluginOptions } from './types';
import { setDefaults } from '../../common';
import { castArray } from 'lodash';
import isHotkey from 'is-hotkey';
import { toggleBlockquote } from './transforms';

/**
 * Enables support for block quotes, useful for
 * quotations and passages.
 */
export const BlockquotePlugin = (
  options?: BlockquotePluginOptions
): SlatePlugin => {
  const { hotkey } = setDefaults(options, DEFAULTS_BLOCKQUOTE)['blockquote'];

  return {
    renderElement: renderElementBlockquote(options),
    deserialize: deserializeBlockquote(options),
    onKeyDown: (e: any, editor: Editor) => {
      if (!hotkey) return;
    
      const hotkeys = castArray(hotkey);

      for (const key of hotkeys) {
        if (isHotkey(key, e)) {
          e.preventDefault();
          toggleBlockquote(editor);
          return;
        }
      }
    }
  }
};
