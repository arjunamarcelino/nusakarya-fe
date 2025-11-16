export function Triangle({ color, ...props }: React.ComponentProps<"svg"> & { color: string }) {
  return (
    <svg width="15" height="37" viewBox="0 0 15 37" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M13.6378 15.8425L0 0.499999L-1.57361e-06 36.5L13.6378 21.1575C14.985 19.6419 14.985 17.3581 13.6378 15.8425Z" fill={color ? color : "#013171"} />
    </svg>
  )
}
