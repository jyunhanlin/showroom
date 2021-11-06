import { Box, Flex, Text, Button } from '@chakra-ui/react';
import * as bodyPix from '@tensorflow-models/body-pix';
import { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-converter';
import '@tensorflow/tfjs-backend-webgl';

const isProd = process.env.NODE_ENV === 'production';
const assetPath = isProd ? process.env.NEXT_PUBLIC_BASE_PATH : '';

export const BodyPix = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const webcamRef = useRef<Webcam>(null);
  const [bodypixnet, setBodypixnet] = useState<bodyPix.BodyPix>();

  useEffect(() => {
    bodyPix.load().then((net: bodyPix.BodyPix) => {
      setBodypixnet(net);
    });
  }, []);

  const drawimage = async (webcam: HTMLVideoElement, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // create tempCanvas
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = webcam.videoWidth;
    tempCanvas.height = webcam.videoHeight;
    const tempCtx = tempCanvas.getContext('2d');
    (async function drawMask() {
      requestAnimationFrame(drawMask);
      // draw mask on tempCanvas
      const segmentation = await bodypixnet.segmentPerson(webcam);
      const mask = bodyPix.toMask(segmentation);
      tempCtx.putImageData(mask, 0, 0);
      // draw original image
      context.drawImage(webcam, 0, 0, canvas.width, canvas.height);
      // use destination-out, then only masked area will be removed
      context.save();
      context.globalCompositeOperation = 'destination-out';
      context.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
      context.restore();
    })();
  };

  const clickHandler = async (pic: 'pic1' | 'pic2') => {
    const webcam = webcamRef.current.video as HTMLVideoElement;
    const canvas = canvasRef.current;
    webcam.width = canvas.width = webcam.videoWidth;
    webcam.height = canvas.height = webcam.videoHeight;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (pic === 'pic1') {
      canvas.style.backgroundImage = `url(${assetPath}/img/bodypix/pic1.jpg)`;
      canvas.style.backgroundSize = 'cover';
    } else {
      canvas.style.backgroundImage = `url(${assetPath}/img/bodypix/pic2.jpg)`;
      canvas.style.backgroundSize = 'cover';
    }

    if (bodypixnet) {
      drawimage(webcam, context, canvas);
    }
  };
  return (
    <Flex flexWrap="wrap">
      <Box position="relative" width="50vw" minWidth="400px" minHeight="300px" margin="20px auto">
        <Webcam
          audio={false}
          ref={webcamRef}
          style={{
            position: 'absolute',
            textAlign: 'center',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9,
            width: '100%',
            height: 'auto',
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            textAlign: 'center',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9,
            width: '100%',
            height: 'auto',
          }}
        />
      </Box>
      <Box margin="20px auto">
        <Text as="h4">Select</Text>
        <Box>
          <Button onClick={() => clickHandler('pic1')}>Pic 1</Button>{' '}
          <Button onClick={() => clickHandler('pic2')}>Pic 2</Button>
        </Box>
      </Box>
    </Flex>
  );
};
