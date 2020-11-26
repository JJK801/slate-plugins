import { isNodeTypeIn } from '../../../common';
import { Editor, Transforms } from 'slate';
import { setDefaults } from '../../../common/utils/setDefaults';
import { DEFAULTS_BLOCKQUOTE } from '../defaults';
import { BlockquotePluginOptionsValues } from '../types';

export const toggleBlockquote = (editor: Editor, options?: Record<"blockquote", BlockquotePluginOptionsValues>) => {
  if (!editor.selection) return;

  const { blockquote } = setDefaults(options, DEFAULTS_BLOCKQUOTE);

  const isActive = isNodeTypeIn(editor, blockquote.type);

  if (!isActive) {
    Transforms.wrapNodes(editor, { type: blockquote.type, children: [] });
  } else {
    Transforms.unwrapNodes(editor, {});
  }
}