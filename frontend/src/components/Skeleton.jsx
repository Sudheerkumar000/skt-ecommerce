const Skeleton = ({ className = "" }) => (
  <div
    className={`animate-pulse rounded-md bg-slate-200/80 dark:bg-slate-700/60 ${className}`}
  />
)

export default Skeleton
