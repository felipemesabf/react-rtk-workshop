const Layout = ({ children }: any) => {
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
      <div style={{ background: "green" }}>
        Esto tiene que aparecer en todas las pantallas
      </div>

      <div style={{ background: "red" }}>{children}</div>
    </div>
  );
};

export default Layout;
