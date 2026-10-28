// Authenticated app boundary shared by the Adult Bloom and Sprout shells.
export default function AuthenticatedAppLayout({
  children,
}: LayoutProps<"/app">) {
  return <div data-shell="app">{children}</div>;
}
