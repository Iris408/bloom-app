// Demo shell boundary: public, uses fictional data, and saves nothing.
export default function DemoLayout({ children }: LayoutProps<"/demo">) {
  return <div data-shell="demo">{children}</div>;
}
