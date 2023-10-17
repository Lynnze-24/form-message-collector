import { forwardRef, useState } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
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
            <div onClick={copyCode} className={styles.iconButton}>
              <span className="material-icons">content_copy</span>
            </div>
          </Tooltip>
        </ClickAwayListener>
        <SyntaxHighlighter
          customStyle={{
            fontSize: '1.35rem',
            padding: '1.5rem',
            borderRadius: '0.5rem',
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
