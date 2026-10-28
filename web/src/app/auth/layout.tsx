// Auth shell boundary for sign-in and related authentication pages.
export default function AuthLayout({ children }: LayoutProps<"/auth">) {
  return <div data-shell="auth">{children}</div>;
}
