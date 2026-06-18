import { useState } from 'react'
import { Button, Card, Input, Select, Badge, Skeleton, Modal } from './components/ui'
import { Mail, Plus } from 'lucide-react'

function App() {
  const [dark, setDark] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  // toggle the "dark" class on <html> — this is exactly how our real theme will work
  const toggleDark = () => {
    setDark((d) => !d)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">UI Library</h1>
          <Button variant="secondary" onClick={toggleDark}>
            {dark ? 'Light' : 'Dark'} mode
          </Button>
        </div>

        <Card>
          <h2 className="mb-4 font-semibold">Buttons</h2>
          <div className="flex flex-wrap gap-3">
            <Button leftIcon={<Plus className="h-4 w-4" />}>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="ghost">Ghost</Button>
            <Button isLoading>Loading</Button>
          </div>
        </Card>

        <Card>
          <h2 className="mb-4 font-semibold">Form fields</h2>
          <div className="space-y-4">
            <Input label="Email" placeholder="you@example.com" leftIcon={<Mail className="h-4 w-4" />} />
            <Input label="With error" defaultValue="bad" error="This field is required" />
            <Select
              label="Category"
              placeholder="Select one"
              options={[
                { value: 'food', label: 'Food' },
                { value: 'transport', label: 'Transport' },
              ]}
            />
          </div>
        </Card>

        <Card>
          <h2 className="mb-4 font-semibold">Badges & Skeleton</h2>
          <div className="mb-4 flex gap-2">
            <Badge tone="success">Income</Badge>
            <Badge tone="danger">Expense</Badge>
            <Badge tone="brand">Brand</Badge>
            <Badge tone="neutral">Neutral</Badge>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </Card>

        <Card hoverable onClick={() => setModalOpen(true)}>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Click this hoverable card to open a modal →
          </p>
        </Card>

        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Example modal">
          <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
            Press Escape, click the backdrop, or use the buttons below.
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={() => setModalOpen(false)}>Confirm</Button>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default App