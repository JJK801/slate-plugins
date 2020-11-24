import { Editor, Transforms } from 'slate';
import { setDefaults } from '../../../common/utils/setDefaults';
import { ELEMENT_PARAGRAPH } from '../../paragraph';
import { DEFAULTS_BLOCKQUOTE } from '../defaults';
import { BlockquotePluginOptionsValues } from '../types';

export const toggleBlockquote = (editor: Editor, options?: Record<"blockquote", BlockquotePluginOptionsValues>) => {
  const { blockquote } = setDefaults(options, DEFAULTS_BLOCKQUOTE);

  Transforms.removeNodes(editor);
  Transforms.insertNodes(
    editor,
    {
      type: blockquote.type,
      children: [
        {
          type: ELEMENT_PARAGRAPH,
          children: [{ text: '' }],
        }
      ],
    },
    { 
      match: (n) => Editor.isBlock(editor, n),
      select: true
    }
  );
};