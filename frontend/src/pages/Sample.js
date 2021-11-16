import React, { useState, useRef } from 'react';
import { Button } from 'react-bootstrap';

import QrCode from 'qrcode';
import QrReader from 'react-qr-reader';

function Sample() {
   const [text, setText] = useState('');
   const [qrcode, setQrcode] = useState('');
   const qrRef = useRef(null);
   const [scanResultFile, setScanResultFile] = useState('');
   const [scanResultWebCam, setScanResultWebCam] = useState('');
   const generateQrCode = async () => {
      try {
         const response = await QrCode.toDataURL(text);
         setQrcode(response);
      } catch (error) {
         console.log(error);
      }
   };

   const handleErrorFile = (error) => {
      console.log(error);
   };
   const handleScanFile = (result) => {
      if (result) {
         setScanResultFile(result);
      }
   };
   const onScanFile = () => {
      qrRef.current.openImageDialog();
   };
   const handleErrorWebCam = (error) => {
      console.log(error);
   };
   const handleScanWebCam = (result) => {
      if (result) {
         setScanResultWebCam(result);
      }
   };

   return (
      <div className="m-5">
         <div className="row">
            <div className="col-lg">
               <input onChange={(e) => setText(e.target.value)} />
               <Button variant="primary" onClick={() => generateQrCode()}>
                  Generate
               </Button>

               <br />
               {qrcode ? (
                  <a href={qrcode} download>
                     <img src={qrcode} alt="" />
                  </a>
               ) : null}
            </div>

            <div className="col-lg">
               <Button variant="secondary" onClick={onScanFile}>
                  Scan Qr Code
               </Button>
               <QrReader
                  ref={qrRef}
                  delay={300}
                  style={{ width: '100%' }}
                  onError={handleErrorFile}
                  onScan={handleScanFile}
                  legacyMode
               />
               <h3>Scanned Code: {scanResultFile}</h3>
            </div>

            <div className="col-lg">
               <h3>Web cam</h3>
               <QrReader
                  delay={200}
                  style={{ width: '100%' }}
                  onError={handleErrorWebCam}
                  onScan={handleScanWebCam}
                  facingMode
               />
               <h3>Scanned By WebCam Code: {scanResultWebCam}</h3>
            </div>
         </div>
      </div>
   );
}

export default Sample;
