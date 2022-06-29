import { useRef } from 'react';

export default function Home() {
  const ref = useRef<HTMLCanvasElement>();
  const rafId = useRef<number>();

  const handleStart = () => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }

    const canvas = ref.current;
    const ctx = canvas.getContext('2d');

    var ball = {
      x: 100,
      y: 100,
      vx: 5,
      vy: 2,
      radius: 25,
      color: 'blue',
      draw: function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
      },
    };

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ball.draw();
      ball.x += ball.vx;
      ball.y += ball.vy;

      if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
        ball.vy = -ball.vy;
      }
      if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
        ball.vx = -ball.vx;
      }

      rafId.current = requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);
  };

  return (
    <>
      <button onClick={handleStart}>Start animation</button>
      <button
        onClick={() => {
          for (let index = 0; index < 50000; index++) {
            console.log(index);
          }
        }}
      >
        Block that thread!
      </button>

      <button
        onClick={() => {
          const worker = new Worker('worker1.js');

          worker.onmessage = (event) => {
            worker.terminate();
          };

          worker.postMessage('workhard');
        }}
      >
        Block that background thread!
      </button>

      <input type="text" />
      <canvas ref={ref} width="600" height="300"></canvas>
    </>
  );
}
