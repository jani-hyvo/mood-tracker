import { SignOutButton } from '../Authentication/SignOut';
import { ThemeToggle } from '../Theme/ThemeToggle';

interface IHeaderProps {
  isSignedIn: boolean;
}

function Header({ isSignedIn }: IHeaderProps) {
  return (
    <div className="flex items-center p-4 border-b">
      <div className="flex-1"></div>
      <div className="flex-1 flex justify-center items-center">
        <img src="/moods.svg" alt="Mood Tracker icon" className="h-8 w-8 mr-2" />
        <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight font-serif">Moods</h1>
      </div>
      <div className="flex-1 flex justify-end items-center space-x-4">
        <ThemeToggle />
        {isSignedIn && <SignOutButton />}
      </div>
    </div>
  );
}

export default Header;
