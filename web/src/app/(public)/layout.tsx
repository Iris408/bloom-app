// Public shell boundary for unauthenticated pages (/ and /demo).
export default function PublicLayout({ children }: LayoutProps<"/">) {
  return <div data-shell="public">{children}</div>;
}
