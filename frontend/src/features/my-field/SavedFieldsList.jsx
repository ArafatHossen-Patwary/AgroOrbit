import { Loader2, MapPinned, Plus, Trash2 } from 'lucide-react'
import { Badge, Button } from '../../components/ui'
import { formatArea, formatCoord } from '../../lib/geo'
import { cn } from '../../lib/cn'

export default function SavedFieldsList({
  fields,
  loading,
  activeFieldId,
  onSelect,
  onNew,
  onDelete,
  deleting,
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-space-950/40">
      <div className="flex items-center justify-between gap-2 border-b border-white/10 px-3 py-2.5">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-space-500">
            Saved fields
          </p>
          <p className="text-[11px] text-space-500">Loaded from Laravel API</p>
        </div>
        <Button size="sm" variant="ghost" leftIcon={<Plus className="h-3.5 w-3.5" />} onClick={onNew}>
          New
        </Button>
      </div>

      <div className="max-h-44 overflow-y-auto p-1.5">
        {loading && (
          <div className="flex items-center justify-center gap-2 px-3 py-6 text-sm text-space-400">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading fields…
          </div>
        )}

        {!loading && fields.length === 0 && (
          <p className="px-3 py-5 text-center text-sm text-space-500">
            No fields saved yet. Draw a plot and save it.
          </p>
        )}

        {!loading &&
          fields.map((field) => {
            const active = field.id === activeFieldId
            return (
              <button
                key={field.id}
                type="button"
                onClick={() => onSelect(field)}
                className={cn(
                  'flex w-full items-start gap-2 rounded-lg px-2.5 py-2 text-left transition',
                  active
                    ? 'bg-orbit-green-500/15 text-orbit-green-300'
                    : 'text-space-200 hover:bg-white/5',
                )}
              >
                <MapPinned className="mt-0.5 h-4 w-4 shrink-0 opacity-80" />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="truncate text-sm font-medium">{field.name}</span>
                    {active && (
                      <Badge variant="success" size="sm">
                        Active
                      </Badge>
                    )}
                  </span>
                  <span className="mt-0.5 block truncate text-[11px] text-space-400">
                    {formatCoord(field.latitude)}, {formatCoord(field.longitude)}
                    {field.area ? ` · ${formatArea(field.area)}` : ''}
                    {field.currentCrop ? ` · ${field.currentCrop}` : ''}
                  </span>
                </span>
              </button>
            )
          })}
      </div>

      {activeFieldId && (
        <div className="border-t border-white/10 p-2">
          <Button
            size="sm"
            variant="ghost"
            className="w-full justify-center text-orbit-rose hover:bg-orbit-rose/10"
            leftIcon={<Trash2 className="h-3.5 w-3.5" />}
            loading={deleting}
            onClick={onDelete}
          >
            Delete selected field
          </Button>
        </div>
      )}
    </div>
  )
}
