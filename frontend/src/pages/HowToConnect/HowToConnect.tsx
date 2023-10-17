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
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Dialog from '../../components/ui/common/Dialog/Dialog';
import TestMessageForm from '../../components/forms/TestMessageForm/TestMessageForm';

interface HowToConnectProps {
  children?: React.ReactNode;
}

const HowToConnect: FC<HowToConnectProps> = ({}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const userId: string | undefined = useSelector(
    (state: RootState) => state?.user?.data?.id
  );

  const codeString: string = `
  async function postMessage(email,subject,messageBody){
   try{
      const response = await fetch("http://localhost:4000/messages/${userId}",{
        method:'POST',
        body:JSON.stringify({
          email,
          subject,
          messageBody
        }),
        headers:{
          "Content-Type":"application/json"
        }
      })
      console.log(response)
      if(response.ok){
        console.log("Message posted successfully!")
      }else{
        //handle error here
      }
    }catch(e){
      //handle error here
      console.log(e)
    }
  };`;

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
                  <div
                    onClick={handleCopyEndPoint}
                    className={styles.iconButton}
                  >
                    <span className="material-icons">content_copy</span>
                  </div>
                </Tooltip>
              </ClickAwayListener>
            </InputAdornment>
          }
          disabled
          fullWidth={true}
          defaultValue={`http://localhost:4000/messages/${userId}`}
        />

        <Button onClick={() => setIsDialogOpen(true)} variant="contained">
          send test email
        </Button>
      </div>

      <h3 className={styles.samplecodeText}>
        Sample Javascript Code for you to connect to the endpoint
      </h3>
      <CodeBlock codeString={codeString} />
      <Dialog onClose={() => setIsDialogOpen(false)} isOpen={isDialogOpen}>
        <TestMessageForm closeDialog={() => setIsDialogOpen(false)} />
      </Dialog>
    </CommonLayout>
  );
};

export default HowToConnect;
