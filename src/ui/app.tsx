import { useState } from 'preact/hooks';
import { Button } from './components/Button';
import { Figma } from '@/ui/utils/figma';

export function App() {
  const [count, setCount] = useState(1);

  return (
    <>
      <main class="w-full h-full p-6">
        <h1 class="font-bold text-xl mb-2">Figify</h1>
        <small class="text-opacity-70">
          Spin up a figma plugin development project in seconds, with your favourite stack.
        </small>
        <div class="mt-4 flex flex-col space-y-4">
          <label class="text-sm">
            <p>Create squares</p>
            <div class="flex mt-1 items-center">
              <input
                class="rounded-l-md text-md w-full px-3 py-2 dark:bg-slate-600"
                type="number"
                id="count"
                value={count}
                //  @ts-ignore
                onInput={(e) => setCount(+e.target?.value)}
              />
              <Button
                class="py-2 rounded-r-md rounded-l-none "
                onClick={() => {
                  Figma.createRectangles(count);
                }}
              >
                Create
              </Button>
            </div>
          </label>
          <label class="text-sm">
            <p>Fill random text</p>
            <div class="flex mt-1 items-center">
              <input
                disabled
                class="rounded-l-md text-md w-full px-3 py-2 disabled:bg-slate-300 dark:disabled:bg-slate-700"
                value={`["Hello world!", "Hi mom", "I'm a rectangle", "Hi dad"]`}
              />
              <Button
                class="py-2 rounded-r-md rounded-l-none"
                onClick={() => {
                  Figma.fillText(['Hello world!', 'Hi mom', "I'm a rectangle", 'Hi dad']);
                }}
              >
                Fill
              </Button>
            </div>
          </label>
        </div>

        <Button
          class="bg-red-500/30 text-red-400 hover:bg-red-500/40 text-xs font-medium absolute bottom-6 right-6"
          onClick={() => Figma.cancel()}
        >
          Close plugin
        </Button>
      </main>
    </>
  );
}
