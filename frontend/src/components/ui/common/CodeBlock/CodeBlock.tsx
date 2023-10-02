import { forwardRef, useState } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import styles from './CodeBlock.module.css';
import Zoom from '@mui/material/Zoom';
import { ClickAwayListener, Tooltip } from '@mui/material';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

SyntaxHighlighter.registerLanguage('javascript', js);
interface CodeBlockProps {
  children?: React.ReactNode;
  codeString: string;
}

const CodeBlock = forwardRef<HTMLInputElement, CodeBlockProps>(
  ({ codeString }, ref) => {
    const [open, setOpen] = useState<boolean | undefined>(false);

    const handleTooltipClose = (): void => {
      setOpen(false);
    };

    const handleTooltipOpen = (): void => {
      setOpen(true);
    };

    const copyCode = async (): Promise<void> => {
      try {
        await navigator.clipboard.writeText(codeString);
        handleTooltipOpen();
        console.log('Text copied to clipboard');
      } catch (error) {
        console.error('Error copying text: ', error);
      }
    };

    return (
      <div ref={ref} className={styles.codeBlockCon}>
        <ClickAwayListener onClickAway={handleTooltipClose}>
          <Tooltip
            arrow
            TransitionComponent={Zoom}
            PopperProps={{
              disablePortal: true,
            }}
            onClose={handleTooltipClose}
            open={open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title="Copied"
          >
            <IconButton
              onClick={copyCode}
              color="primary"
              className={styles.iconButton}
            >
              <ContentCopyIcon color="primary" />
            </IconButton>
          </Tooltip>
        </ClickAwayListener>
        <SyntaxHighlighter
          customStyle={{
            fontSize: '1.8rem',
            padding: '3rem',
            borderRadius: '1rem',
          }}
          language="javascript"
          style={docco}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    );
  }
);

export default CodeBlock;
