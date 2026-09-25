import { cn } from '../../lib/cn'
import Breadcrumb from './Breadcrumb'

export default function PageContainer({
  children,
  className,
  title,
  description,
  actions,
  showMobileBreadcrumb = true,
}) {
  return (
    <div className={cn('mx-auto w-full max-w-6xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8', className)}>
      {showMobileBreadcrumb && (
        <div className="mb-4 md:hidden">
          <Breadcrumb />
        </div>
      )}

      {(title || actions) && (
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            {title && (
              <h1 className="font-display text-2xl font-bold tracking-tight text-space-50 sm:text-3xl lg:text-[2rem]">
                {title}
              </h1>
            )}
            {description && (
              <p className="mt-1.5 max-w-2xl text-sm tracking-[0.01em] text-space-300 sm:text-base">
                {description}
              </p>
            )}
          </div>
          {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
        </div>
      )}

      {children}
    </div>
  )
}
