import { LogsList } from "./components/LogsList";
import { LogsProvider } from "./contexts/LogProvider";

export default function Home() {
  return (
    <LogsProvider>
      <main className="py-4">
        <LogsList />
      </main>
    </LogsProvider>
  )
}
