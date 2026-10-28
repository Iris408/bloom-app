// Adult Bloom shell. Sprout routes sit outside this group, so they never
// inherit it.
export default function AdultLayout({ children }: LayoutProps<"/app">) {
  return <div data-shell="adult">{children}</div>;
}
