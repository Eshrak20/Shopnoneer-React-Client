import { Outlet } from "react-router";
import CommonLayout from "./layout/CommonLayout";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <CommonLayout>
      <main className="bg-background">
        <HelmetProvider>
          <Outlet />
        </HelmetProvider>
      </main>
    </CommonLayout>
  );
}

export default App;
