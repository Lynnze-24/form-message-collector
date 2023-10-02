import React, { FC, useRef, useState } from 'react';
import CommonLayout from '../../components/ui/layout/CommonLayout';
import {
  Button,
  ClickAwayListener,
  InputAdornment,
  OutlinedInput,
  Tooltip,
} from '@mui/material';
import styles from './HowToConnect.module.css';
import CodeBlock from '../../components/ui/common/CodeBlock/CodeBlock';
import Zoom from '@mui/material/Zoom';

interface HowToConnectProps {
  children?: React.ReactNode;
}

const codeString: string = `
  export function getDateTime(timeStr: string): string {
    const date = new Date(timeStr);
    let currentDateStr = date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });
  
    const Today = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });
  
    currentDateStr = currentDateStr === Today ? 'Today' : currentDateStr;
    const currentTimeStr = date.toLocaleTimeString('en-US', {
      minute: '2-digit',
      hour: '2-digit',
    });
  
    return (currentDateStr + ' at ' +currentTimeStr)
  };`;

const HowToConnect: FC<HowToConnectProps> = ({}) => {
  const endPointRef = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useState<boolean | undefined>(false);

  const handleTooltipClose = (): void => {
    setOpen(false);
  };

  const handleTooltipOpen = (): void => {
    setOpen(true);
  };

  const handleCopyEndPoint = async (): Promise<void> => {
    try {
      if (endPointRef.current) {
        let textToCopy = endPointRef.current.defaultValue;
        await navigator.clipboard.writeText(textToCopy);
        console.log('Text copied to clipboard');
        console.dir(endPointRef.current);
        handleTooltipOpen();
      }
    } catch (error) {
      console.error('Error copying text: ', error);
    }
  };

  return (
    <CommonLayout>
      <h3 className={styles.endPointTxt}>
        Send post requests to the following url to let us collect your messages.
      </h3>
      <div className={styles.endPointCon}>
        <OutlinedInput
          inputRef={endPointRef}
          className="endpointInput"
          size="small"
          id="endpoint"
          type="text"
          endAdornment={
            <InputAdornment position="end">
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
                  <Button onClick={handleCopyEndPoint}>copy</Button>
                </Tooltip>
              </ClickAwayListener>
            </InputAdornment>
          }
          disabled
          fullWidth={true}
          defaultValue="https://aunghtetlinn.ddd/adksldsdj"
        />

        <Button variant="contained">send test email</Button>
      </div>

      <h3 className={styles.samplecodeText}>
        Sample Javascript Code for you to connect to the endpoint
      </h3>
      <CodeBlock codeString={codeString} />
    </CommonLayout>
  );
};

export default HowToConnect;
