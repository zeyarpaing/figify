import { JSX } from 'preact';
import { twMerge } from 'tailwind-merge';

export function Button({
  class: $class,
  className,
  ...props
}: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      class={twMerge(
        'bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-3 rounded',
        ($class || className) as string
      )}
      {...props}
    />
  );
}
