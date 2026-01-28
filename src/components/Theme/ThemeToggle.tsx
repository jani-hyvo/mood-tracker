import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/shadcn/button';
import { useTheme } from './theme-provider';
import { Toggle } from '../shadcn/toggle';
import { Tooltip, TooltipTrigger } from '../shadcn/tooltip';
import { TooltipContent } from '@radix-ui/react-tooltip';

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <Toggle
      aria-label="Toggle theme"
      size="sm"
      variant="outline"
      className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500"
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Toggle theme</p>
        </TooltipContent>
      </Tooltip>
    </Toggle>
  );
}
