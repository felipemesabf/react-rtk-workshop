interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <h1>Error</h1>;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>Esto tiene que aparecer en todas las pantallas</div>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
