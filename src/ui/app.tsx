import { useState } from 'preact/hooks';
import { Button } from './components/Button';
import { Figma } from '@/ui/utils/figma';

export function App() {
  const [count, setCount] = useState(1);

  return (
    <>
      <main class="w-full h-full p-6">
        <h1 class="dark:text-teal-500 text-blue-500 font-bold text-xl mb-2">Rectangle Creator</h1>
        <label class="text-sm">
          Ractangle count:{' '}
          <input
            class="rounded text-md w-full px-3 py-2 text-black"
            type="number"
            id="count"
            value={count}
            //  @ts-ignore
            onChange={(e) => setCount(+e.target?.value)}
          />
        </label>
        <div class="flex gap-2 items-center  justify-center my-2">
          <Button
            id="fill"
            onClick={() => {
              Figma.fillText(['Hello world!', 'Hi mom', "I'm a rectangle", 'Hi dad']);
            }}
          >
            Fill Random Text
          </Button>
          <Button
            id="create"
            onClick={() => {
              Figma.createRectangles(count);
            }}
          >
            Create
          </Button>
        </div>

        <Button id="create" onClick={() => Figma.cancel()}>
          Close
        </Button>
      </main>
    </>
  );
}
