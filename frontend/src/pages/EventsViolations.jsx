import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader'
import Input from '../components/ui/Input'
import Select from '../components/ui/Select'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Table, TBody, TD, TH, THead, TR } from '../components/ui/Table'
import { eventsAndViolations } from '../data/dummy'
import { cap } from '../utils/format'
import { Filter, Search } from 'lucide-react'

export default function EventsViolations() {
  const [query, setQuery] = useState('')
  const [type, setType] = useState('all')
  const [severity, setSeverity] = useState('all')
  const [status, setStatus] = useState('all')
  const [selectedAmbulance, setSelectedAmbulance] = useState(null)
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()

    return eventsAndViolations.filter((e) => {
      const matchesQ =
        !q ||
        e.id.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q) ||
        e.camera.toLowerCase().includes(q) ||
        (e.plate || '').toLowerCase().includes(q)

      const matchesType = type === 'all' ? true : e.type.toLowerCase() === type
      const matchesSeverity =
        severity === 'all' ? true : e.severity.toLowerCase() === severity
      const matchesStatus =
        status === 'all' ? true : e.status.toLowerCase() === status

      return matchesQ && matchesType && matchesSeverity && matchesStatus
    })
  }, [query, type, severity, status])

  const severityTone = (s) => {
    if (s === 'critical') return 'bad'
    if (s === 'high') return 'bad'
    if (s === 'medium') return 'warn'
    return 'neutral'
  }

  const statusTone = (s) => {
    if (s === 'resolved') return 'good'
    if (s === 'escalated') return 'bad'
    return 'info'
  }

  return (
    <div className="space-y-4">
      <PageHeader
        title="Events & Violations"
        subtitle="Search, filter, and review detected incidents (dummy data)"
        right={
          <Button variant="ghost">
            <Filter className="h-4 w-4" />
            Advanced Filters
          </Button>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
              <Input
                className="pl-10"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search ID, location, plate..."
              />
            </div>

            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="all">All Types</option>
              <option value="event">Event</option>
              <option value="violation">Violation</option>
            </Select>

            <Select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
            >
              <option value="all">All Severity</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </Select>

            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="escalated">Escalated</option>
              <option value="resolved">Resolved</option>
            </Select>
          </div>

          <div className="mt-3 text-xs text-slate-400">
            Showing <b className="text-slate-200">{filtered.length}</b> results
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Incident Table</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <THead>
              <TH>ID</TH>
              <TH>Type</TH>
              <TH>Category</TH>
              <TH>Severity</TH>
              <TH>Status</TH>
              <TH>Camera</TH>
              <TH>Location</TH>
              <TH>Plate</TH>
              <TH>Time</TH>
            </THead>

            <TBody>
              {filtered.map((e) => (
                <TR
                  key={e.id}
                  onClick={() => {
                    if (e.category.toLowerCase() === "ambulance") {
                      setSelectedAmbulance(e)
                    }
                  }}
                  className="cursor-pointer hover:bg-slate-800"
                >
                  <TD className="font-semibold">{e.id}</TD>
                  <TD>{e.type}</TD>
                  <TD>{e.category}</TD>
                  <TD>
                    <Badge tone={severityTone(e.severity)}>
                      {cap(e.severity)}
                    </Badge>
                  </TD>
                  <TD>
                    <Badge tone={statusTone(e.status)}>{cap(e.status)}</Badge>
                  </TD>
                  <TD>{e.camera}</TD>
                  <TD>{e.location}</TD>
                  <TD>{e.plate}</TD>
                  <TD>{e.time}</TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </CardContent>
      </Card>
      {selectedAmbulance && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-slate-900 p-6 rounded-2xl w-[350px] border border-white/10">
            <h2 className="text-lg font-semibold text-white mb-3">
              🚑 Ambulance Route Alert
            </h2>

            <p className="text-sm text-slate-300">
              Event ID: {selectedAmbulance.id}
            </p>

            <p className="text-sm text-slate-300">
              Current Location: {selectedAmbulance.location}
            </p>

            <p className="text-sm text-green-400">
              Next Destination: {selectedAmbulance.next}
            </p>

            <button
              onClick={() => setSelectedAmbulance(null)}
              className="mt-4 w-full rounded-lg bg-blue-500 py-2 text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
