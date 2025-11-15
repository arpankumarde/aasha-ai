import SidebarWrapper from "./sidebar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (<SidebarWrapper>{children}</SidebarWrapper>);
}
