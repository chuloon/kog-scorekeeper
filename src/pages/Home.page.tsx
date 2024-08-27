import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import { TabSelector } from '@/components/TabSelector/TabSelector';

export function HomePage() {
  return (
    <>
    <ColorSchemeToggle />
      <TabSelector />
    </>
  );
}
