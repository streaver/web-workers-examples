import { useRef } from 'react';

export default function Home() {
  const ref = useRef<HTMLCanvasElement>();
  const workerRef = useRef<Worker>();
  const offscreenRef = useRef<any>();

  const handleStart = () => {
    if (!workerRef.current) {
      workerRef.current = new Worker('worker2.js');
      const canvas = ref.current;
      //@ts-ignore
      offscreenRef.current = canvas.transferControlToOffscreen();

      workerRef.current.postMessage({ canvas: offscreenRef.current }, [
        offscreenRef.current,
      ]);
    }

    workerRef.current.postMessage('start');
  };

  return (
    <>
      <button onClick={handleStart}>Start animation in worker</button>
      <button
        onClick={() => {
          for (let index = 0; index < 50000; index++) {
            console.log(index);
          }
        }}
      >
        Block that thread!
      </button>
      <input type="text" />
      <canvas ref={ref} width="600" height="300"></canvas>
    </>
  );
}
