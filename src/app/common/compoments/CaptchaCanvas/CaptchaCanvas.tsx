import React, { useEffect, useRef } from 'react';
import { CaptchaCanvasProps } from './types';

const CaptchaCanvas: React.FC<CaptchaCanvasProps> = ({ code, ...props }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /**
   * @description 產生 Captcha Canvas 樣式  (若外部傳進來的 Code 有變動才執行此 Effect)
   */
  useEffect(() => {
    if (!canvasRef || !canvasRef.current) return;
    const codeSnippets = code.split('');
    const context = canvasRef.current.getContext('2d');
    if (context) {
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      for (let i = 0; i < codeSnippets.length; i += 1) {
        const sDeg = (createDynamicNumber() * 30 * Math.PI) / 180;
        const x = 10 + i * 20;
        const y = 20 + createDynamicNumber() * 8;
        context.font = 'bold 24px Microsoft JhengHei';
        context.translate(x, y);
        context.rotate(sDeg);
        context.fillStyle = createRandomColorCode();
        context.fillText(codeSnippets[i], 0, 0);
        context.rotate(-sDeg);
        context.translate(-x, -y);
      }
      for (let i = 0; i <= 5; i += 1) {
        context.strokeStyle = createRandomColorCode();
        context.beginPath();
        context.moveTo(
          createDynamicNumber() * canvasRef.current.width,
          createDynamicNumber() * canvasRef.current.height
        );
        context.lineTo(
          createDynamicNumber() * canvasRef.current.width,
          createDynamicNumber() * canvasRef.current.height
        );
        context.stroke();
      }
      for (let i = 0; i < 30; i += 1) {
        context.strokeStyle = createRandomColorCode();
        context.beginPath();
        const x = createDynamicNumber() * canvasRef.current.width;
        const y = createDynamicNumber() * canvasRef.current.height;
        context.moveTo(x, y);
        context.lineTo(x + 1, y + 1);
        context.stroke();
      }
    }
  // eslint-disable-next-line
  }, [code]);

  /**
   * @description 產生亂數色碼
   */
  const createRandomColorCode = () => {
    const r = Math.floor(createDynamicNumber() * 256);
    const g = Math.floor(createDynamicNumber() * 256);
    const b = Math.floor(createDynamicNumber() * 256);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  };

  /**
   * @description 產生動態數字段
   */
  function createDynamicNumber () {
    const patchNum = (new Date()).getTime().toString().split('').reverse().join('');
    const patchNumReverse = patchNum.split('').reverse().join('');
    const num = +`0.${window.crypto.getRandomValues(new Uint32Array(1))[0]}${patchNum}${patchNumReverse}`;
    return num;
  };

  return (
    <canvas style={{ backgroundColor: '#F4F4F4', boxShadow: '3px 3px 6px rgba(0, 0, 0, .3)' }} ref={canvasRef} {...props} />
  );
};

export default CaptchaCanvas;
