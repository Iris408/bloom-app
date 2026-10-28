// Sprout shell for one Sprout profile. [profile] is an opaque identifier.
export default function SproutLayout({
  children,
}: LayoutProps<"/app/sprout/[profile]">) {
  return <div data-shell="sprout">{children}</div>;
}
